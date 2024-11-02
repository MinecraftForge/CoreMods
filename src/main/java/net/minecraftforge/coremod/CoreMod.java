/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod;

import cpw.mods.modlauncher.api.ITransformer;
import net.minecraftforge.coremod.api.ASMAPI;
import net.minecraftforge.coremod.transformer.CoreModClassTransformer;
import net.minecraftforge.coremod.transformer.CoreModFieldTransformer;
import net.minecraftforge.coremod.transformer.CoreModMethodTransformer;
import net.minecraftforge.forgespi.coremod.ICoreModFile;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import org.jetbrains.annotations.Nullable;

import javax.script.Bindings;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptException;
import java.io.IOException;
import java.io.Reader;
import java.nio.file.Path;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Represents a coremod.
 */
public class CoreMod {
    /**
     * Used to log events inside coremods.
     *
     * @see ASMAPI#log(String, String, Object...)
     */
    public static final Marker COREMODLOG = MarkerManager.getMarker("COREMODLOG").addParents(MarkerManager.getMarker("COREMOD"));

    private final ICoreModFile file;
    private final ScriptEngine scriptEngine;
    private Map<String, ? extends Bindings> javaScript;
    private boolean loaded = false;
    private Exception error;
    private Logger logger;

    CoreMod(final ICoreModFile file, final ScriptEngine scriptEngine) {
        this.file = file;
        this.scriptEngine = scriptEngine;
    }

    /**
     * Gets the path to the coremod file.
     *
     * @return The path
     */
    public Path getPath() {
        return this.file.getPath();
    }

    @SuppressWarnings("unchecked")
    void initialize() {
        this.logger = LogManager.getLogger("net.minecraftforge.coremod.CoreMod." + this.file.getOwnerId());
        try {
            // TODO would it be better to setCoreMod before eval? this would allow loadFile and loadData to be run in the global context
            this.scriptEngine.eval(this.file.readCoreMod());
            CoreModTracker.setCoreMod(this);
            this.javaScript = (Map<String, ? extends Bindings>) ((Invocable) this.scriptEngine).invokeFunction("initializeCoreMod");
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
    private ITransformer<?> buildCore(Map.Entry<String, ? extends Bindings> entry) {
        final String coreName = entry.getKey();
        final Bindings data = entry.getValue();
        final Map<String, Object> targetData = (Map<String, Object>) data.get("target");
        final ITransformer.TargetType targetType = ITransformer.TargetType.valueOf((String) targetData.get("type"));
        final Set<ITransformer.Target> targets;
        final Bindings function = (Bindings) data.get("transformer");
        switch (targetType) {
            case CLASS:
                if (targetData.containsKey("names")) {
                    Function<Map<String, Object>, Map<String, Object>> names = NashornFactory.getFunction((Bindings) targetData.get("names"));
                    targets = names.apply(targetData).values().stream().map(o -> (String) o).map(ITransformer.Target::targetClass).collect(Collectors.toSet());
                } else
                    targets = Stream.of(ITransformer.Target.targetClass((String) targetData.get("name"))).collect(Collectors.toSet());
                return new CoreModClassTransformer(this, coreName, targets, NashornFactory.getFunction(function));
            case METHOD:
                targets = Collections.singleton(ITransformer.Target.targetMethod(
                    (String) targetData.get("class"), ASMAPI.mapMethod((String) targetData.get("methodName")), (String) targetData.get("methodDesc")));
                return new CoreModMethodTransformer(this, coreName, targets, NashornFactory.getFunction(function));
            case FIELD:
                targets = Collections.singleton(ITransformer.Target.targetField(
                    (String) targetData.get("class"), ASMAPI.mapField((String) targetData.get("fieldName"))));
                return new CoreModFieldTransformer(this, coreName, targets, NashornFactory.getFunction(function));
            default:
                throw new RuntimeException("Unimplemented target type " + targetData);
        }
    }

    /**
     * Returns whether the coremod has an error. Usually paired with {@link #getError()}.
     *
     * @return {@code true} if the coremod has an error
     */
    public boolean hasError() {
        return !this.loaded;
    }

    /**
     * Returns the error that occurred while loading the coremod. Only consider valid if {@link #hasError()} returns
     * {@code true}.
     *
     * @return The error that occurred
     */
    public Exception getError() {
        return this.error;
    }

    /**
     * Gets the coremod file.
     *
     * @return The coremod file
     */
    public ICoreModFile getFile() {
        return this.file;
    }

    /**
     * Loads an additional file into the script engine.
     *
     * @param fileName The file to load
     * @return {@code true} if loading was successful
     *
     * @throws ScriptException If the script engine encounters an error, usually due to a syntax error in the script
     * @throws IOException     If an I/O error occurs while reading the file, usually due to a corrupt or missing file
     */
    public boolean loadAdditionalFile(final String fileName) throws ScriptException, IOException {
        // why does this method return a boolean if we're going to crash anyways on load failure?
        // it looks like the case of the coremod not being tracked is never reached
        if (this.loaded) return false;

        Reader additional = this.file.getAdditionalFile(fileName);
        this.scriptEngine.eval(additional);
        return true;
    }

    /**
     * Loads additional JSON data from a file into an {@link Object}.
     *
     * @param fileName The file to load
     * @return The loaded JSON data if successful, or {@code null} if not
     *
     * @throws ScriptException If the parsed JSON data is malformed
     * @throws IOException     If an I/O error occurs while reading the file, usually due to a corrupt or missing file
     */
    @Nullable
    public Object loadAdditionalData(final String fileName) throws ScriptException, IOException {
        // again with this shit, dude! why are we going to return null??
        // isn't the coremod always going to be tracked if it calls ASMAPI.loadData from itself?
        if (this.loaded) return null;

        Reader additional = this.file.getAdditionalFile(fileName);

        char[] buf = new char[4096];
        StringBuilder builder = new StringBuilder();
        int numChars;
        while ((numChars = additional.read(buf)) >= 0)
            builder.append(buf, 0, numChars);
        String str = builder.toString();

        return this.scriptEngine.eval("tmp_json_loading_variable = " + str + ";");
    }

    /**
     * Logs a message from the coremod.
     *
     * @param level   The log level
     * @param message The message
     * @param args    Any formatting arguments
     * @see ASMAPI#log(String, String, Object...)
     */
    public void logMessage(final String level, final String message, final Object[] args) {
        this.logger.log(Level.getLevel(level), COREMODLOG, message, args);
    }
}
