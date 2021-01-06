package net.minecraftforge.coremod;

import cpw.mods.modlauncher.api.*;
import net.minecraftforge.coremod.api.ASMAPI;
import net.minecraftforge.coremod.transformer.CoreModClassTransformer;
import net.minecraftforge.coremod.transformer.CoreModFieldTransformer;
import net.minecraftforge.coremod.transformer.CoreModMethodTransformer;
import net.minecraftforge.forgespi.coremod.*;
import org.apache.logging.log4j.*;
import javax.annotation.Nullable;
import javax.script.*;
import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.function.Function;
import java.util.stream.*;

public class CoreMod {
    public static final Marker COREMODLOG = MarkerManager.getMarker("COREMODLOG").addParents(MarkerManager.getMarker("COREMOD"));
    private final ICoreModFile file;
    private final ScriptEngine scriptEngine;
    private Map<String, Map<String, Object>> javaScript;
    private boolean loaded = false;
    private Exception error;
    private Logger logger;

    CoreMod(final ICoreModFile file, final ScriptEngine scriptEngine) {
        this.file = file;
        this.scriptEngine = scriptEngine;
    }

    public Path getPath() {
        return this.file.getPath();
    }

    @SuppressWarnings("unchecked")
    void initialize() {
        logger = LogManager.getLogger("net.minecraftforge.coremod.CoreMod."+this.file.getOwnerId());
        try {
            scriptEngine.eval(file.readCoreMod());
            CoreModTracker.setCoreMod(this);
            this.javaScript = (Map<String, Map<String, Object>>) ((Invocable) scriptEngine).invokeFunction("initializeCoreMod");
            CoreModTracker.clearCoreMod();
            this.loaded = true;
        } catch (IOException | ScriptException | NoSuchMethodException e) {
            this.loaded = false;
            this.error = e;
        }
    }


    List<ITransformer<?>> buildTransformers() {
        if (!this.loaded) return Collections.emptyList();
        return this.javaScript.entrySet().stream().map(this::buildCore).collect(Collectors.toList());
    }

    @SuppressWarnings("unchecked")
    private ITransformer<?> buildCore(Map.Entry<String,Map<String, Object>> entry) {
        final String coreName = entry.getKey();
        final Map<String, Object> data = entry.getValue();
        final Map<String, Object> targetData = (Map<String, Object>)data.get("target");
        final ITransformer.TargetType targetType = ITransformer.TargetType.valueOf((String)targetData.get("type"));
        final Set<ITransformer.Target> targets;
        final Map<String, Object> function = (Map<String, Object>)data.get("transformer");
        switch (targetType) {
            case CLASS:
                if (targetData.containsKey("names")) {
                    Function<Map<String, Object>, Map<String, Object>> names = wrap(targetData.get("names"));
                    targets = names.apply(targetData).values().stream().map(o -> (String)o).map(ITransformer.Target::targetClass).collect(Collectors.toSet());
                } else
                    targets = Stream.of(ITransformer.Target.targetClass((String)targetData.get("name"))).collect(Collectors.toSet());
                return new CoreModClassTransformer(this, coreName, targets, wrap(function));
            case METHOD:
                targets = Collections.singleton(ITransformer.Target.targetMethod(
                        (String) targetData.get("class"), ASMAPI.mapMethod((String) targetData.get("methodName")), (String) targetData.get("methodDesc")));
                return new CoreModMethodTransformer(this, coreName, targets, wrap(function));
            case FIELD:
                targets = Collections.singleton(ITransformer.Target.targetField(
                        (String) targetData.get("class"), ASMAPI.mapField((String) targetData.get("fieldName"))));
                return new CoreModFieldTransformer(this, coreName, targets, wrap(function));
            default:
                throw new RuntimeException("Unimplemented target type " + targetData);
        }
    }

    @SuppressWarnings({ "unchecked" })
    private <A,R> Function<A,R> wrap(Object obj) {
        /*
         * Takes a function returned from a previous invocation of the JS and turns it into a Function we can call from Java.
         * The old way to do it was to use the Nashorn API directly, but this isn't something we can rely on as J15 removed nashorn by default
         * And the piont is to try and uncouple as best we can from nashorn specifics. So what we do is have the JS create a Function for us using the source for the returned function.
         * This isn't great as doing new INTERFACE(function(){}) IS a Nashorn extension of JS, however it's also supported by other JS providers like Graal.
         * So it's technically more compatible then using the hard dep on the java class.
         */
        try {
            return (Function<A,R>)scriptEngine.eval("new java.util.function.Function(" + obj.toString() + ")");
        } catch (ScriptException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean hasError() {
        return !loaded;
    }

    public Exception getError() {
        return error;
    }

    public ICoreModFile getFile() {
        return file;
    }

    public boolean loadAdditionalFile(final String fileName) throws ScriptException, IOException {
        if (loaded) return false;
        Reader additional = file.getAdditionalFile(fileName);
        scriptEngine.eval(additional);
        return true;
    }

    @Nullable
    public Object loadAdditionalData(final String fileName) throws ScriptException, IOException {
        if (loaded) return null;
        Reader additional = file.getAdditionalFile(fileName);

        char[] buf = new char[4096];
        StringBuilder builder = new StringBuilder();
        int numChars;
        while ((numChars = additional.read(buf)) >= 0)
            builder.append(buf, 0, numChars);
        String str = builder.toString();

        return scriptEngine.eval("tmp_json_loading_variable = " + str + ";");
    }

    public void logMessage(final String level, final String message, final Object[] args) {
        logger.log(Level.getLevel(level), COREMODLOG, message, args);
    }
}
