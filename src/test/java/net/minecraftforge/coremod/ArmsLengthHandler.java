package net.minecraftforge.coremod;

import org.apache.logging.log4j.LogManager;

import java.util.concurrent.Callable;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

public class ArmsLengthHandler implements Callable<Void> {
    @Override
    public Void call() throws Exception {
        final ClassLoader contextClassLoader = Thread.currentThread().getContextClassLoader();
        LogManager.getLogger().info("CCL is {}", contextClassLoader);
        final Class<?> testClass = Class.forName("cpw.mods.TestClass", true, contextClassLoader);
        assertFalse((boolean)testClass.getMethod("testMethod").invoke(null));

        boolean result = (boolean)testClass.getMethod("testInsert").invoke(null);
        assertFalse(result);
        final Class<?> redirectClass = Class.forName("cpw.mods.RedirectClass", true, contextClassLoader);
        assertEquals(1, (int) redirectClass.getMethod("getAfterCallCount").invoke(null));
        assertEquals(1, (int) redirectClass.getMethod("getBeforeCallCount").invoke(null));
        return null;
    }
}
