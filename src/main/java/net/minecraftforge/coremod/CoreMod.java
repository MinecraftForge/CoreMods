package net.minecraftforge.coremod;

import cpw.mods.modlauncher.api.*;
import jdk.nashorn.api.scripting.*;
import net.minecraftforge.coremod.api.ASMAPI;
import net.minecraftforge.coremod.transformer.CoreModClassTransformer;
import net.minecraftforge.coremod.transformer.CoreModFieldTransformer;
import net.minecraftforge.coremod.transformer.CoreModMethodTransformer;
import net.minecraftforge.forgespi.coremod.*;
import org.apache.logging.log4j.*;

import javax.script.*;
import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.stream.*;

public class CoreMod {
    public static final Marker COREMODLOG = MarkerManager.getMarker("COREMODLOG").addParents(MarkerManager.getMarker("COREMOD"));
    private final ICoreModFile file;
    private final ScriptEngine scriptEngine;
    private Map<String, ScriptObjectMirror> javaScript;
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
            ScriptObjectMirror som = (ScriptObjectMirror) scriptEngine.eval(file.readCoreMod());
            CoreModTracker.setCoreMod(this);
            this.javaScript = (Map<String, ScriptObjectMirror>) ((Invocable) scriptEngine).invokeFunction("initializeCoreMod");
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
    private ITransformer<?> buildCore(Map.Entry<String,ScriptObjectMirror> entry) {
        final String coreName = entry.getKey();
        final ScriptObjectMirror data = entry.getValue();
        final ScriptObjectMirror targetData = (ScriptObjectMirror) data.getMember("target");
        final ITransformer.TargetType targetType = ITransformer.TargetType.valueOf((String) targetData.getMember("type"));
        final Set<ITransformer.Target> targets;
        final ScriptObjectMirror function = (ScriptObjectMirror) data.getMember("transformer");
        switch (targetType) {
            case CLASS:
                targets = targetData.hasMember("names") ?
                        ((ScriptObjectMirror)((ScriptObjectMirror)targetData.getMember("names")).call(targetData)).values().stream().map(o->(String)o).map(ITransformer.Target::targetClass).collect(Collectors.toSet()) :
                        Stream.of(ITransformer.Target.targetClass((String) targetData.get("name"))).collect(Collectors.toSet());
                return new CoreModClassTransformer(this, coreName, targets, function);
            case METHOD:
                targets = Collections.singleton(ITransformer.Target.targetMethod(
                        (String) targetData.get("class"), ASMAPI.mapMethod((String) targetData.get("methodName")), (String) targetData.get("methodDesc")));
                return new CoreModMethodTransformer(this, coreName, targets, function);
            case FIELD:
                targets = Collections.singleton(ITransformer.Target.targetField(
                        (String) targetData.get("class"), ASMAPI.mapField((String) targetData.get("fieldName"))));
                return new CoreModFieldTransformer(this, coreName, targets, function);
            default:
                throw new RuntimeException("Unimplemented target type " + targetData);
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

    public void logMessage(final String level, final String message, final Object[] args) {
        logger.log(Level.getLevel(level), COREMODLOG, message, args);
    }
}
