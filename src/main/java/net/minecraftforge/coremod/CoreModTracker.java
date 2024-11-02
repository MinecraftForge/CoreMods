/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod;

import org.jetbrains.annotations.Nullable;

import javax.script.ScriptException;
import java.io.IOException;

/**
 * Tracks the current coremod being processed.
 */
public class CoreModTracker {
    private static final ThreadLocal<CoreModTracker> LOCAL = ThreadLocal.withInitial(CoreModTracker::new);

    private CoreMod tracked;

    /**
     * Sets the coremod currently being processed.
     *
     * @param coreMod The coremod to track
     */
    public static void setCoreMod(CoreMod coreMod) {
        LOCAL.get().tracked = coreMod;
    }

    /**
     * Clears the coremod currently being processed.
     */
    public static void clearCoreMod() {
        LOCAL.get().tracked = null;
    }

    /**
     * Loads a script file by name. This will be loaded relative to the coremod's path.
     *
     * @param file The file to load
     * @return True if the file was loaded, false otherwise
     *
     * @throws ScriptException If the script engine encounters an error, usually due to a syntax error in the script
     * @throws IOException     If an I/O error occurs while reading the file, usually due to a corrupt or missing file
     * @see net.minecraftforge.coremod.api.ASMAPI#loadFile(String)
     */
    public static boolean loadFileByName(final String file) throws ScriptException, IOException {
        final CoreMod tracked = LOCAL.get().tracked;
        if (tracked != null) {
            return tracked.loadAdditionalFile(file);
        }
        return false;
    }

    /**
     * Loads a JSON data file by name. This will be loaded relative to the coremod's path.
     *
     * @param file The file to load
     * @return The loaded JSON data if successful, or {@code null} if not
     *
     * @throws ScriptException If the parsed JSON data is malformed
     * @throws IOException     If an I/O error occurs while reading the file, usually due to a corrupt or missing file
     * @see net.minecraftforge.coremod.api.ASMAPI#loadData(String)
     */
    @Nullable
    public static Object loadDataByName(final String file) throws ScriptException, IOException {
        final CoreMod tracked = LOCAL.get().tracked;
        if (tracked != null) {
            return tracked.loadAdditionalData(file);
        }
        return null;
    }

    /**
     * Logs a message from the coremod.
     *
     * @param level   The log level
     * @param message The message
     * @param args    Any formatting arguments
     * @see net.minecraftforge.coremod.api.ASMAPI#log(String, String, Object...)
     */
    public static void log(final String level, final String message, final Object[] args) {
        final CoreMod tracked = LOCAL.get().tracked;
        if (tracked != null) {
            tracked.logMessage(level, message, args);
        }
    }
}
