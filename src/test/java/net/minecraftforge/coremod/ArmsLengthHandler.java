package net.minecraftforge.coremod;

import org.apache.logging.log4j.LogManager;

import java.util.concurrent.Callable;

import static org.junit.jupiter.api.Assertions.assertFalse;

public class ArmsLengthHandler implements Callable<Void> {
    @Override
    public Void call() throws Exception {
        final ClassLoader contextClassLoader = Thread.currentThread().getContextClassLoader();
        LogManager.getLogger().info("CCL is {}", contextClassLoader);
        final Class<?> aClass = Class.forName("cpw.mods.TestClass", true, contextClassLoader);
        assertFalse((Boolean)aClass.getMethod("testMethod").invoke(null));
        return null;
    }
}
