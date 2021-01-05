package net.minecraftforge.coremod;

import javax.annotation.Nullable;
import javax.script.ScriptException;
import java.io.IOException;

public class CoreModTracker {
    private static ThreadLocal<CoreModTracker> coreModThreadLocal = ThreadLocal.withInitial(CoreModTracker::new);

    private CoreMod tracked;

    public static void setCoreMod(CoreMod coreMod) {
        coreModThreadLocal.get().tracked = coreMod;
    }

    public static void clearCoreMod() {
        coreModThreadLocal.get().tracked = null;
    }

    public static boolean loadFileByName(final String file) throws ScriptException, IOException {
        final CoreMod tracked = coreModThreadLocal.get().tracked;
        if (tracked != null) {
            return tracked.loadAdditionalFile(file);
        }
        return false;
    }

    @Nullable
    public static Object loadDataByName(final String file) throws ScriptException, IOException {
        final CoreMod tracked = coreModThreadLocal.get().tracked;
        if (tracked != null) {
            return tracked.loadAdditionalData(file);
        }
        return null;
    }

    public static void log(final String level, final String message, final Object[] args) {
        final CoreMod tracked = coreModThreadLocal.get().tracked;
        if (tracked != null) {
            tracked.logMessage(level, message, args);
        }
    }
}
