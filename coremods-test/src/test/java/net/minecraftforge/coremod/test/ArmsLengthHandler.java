/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod.test;

import org.apache.logging.log4j.LogManager;

import java.util.concurrent.Callable;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

public class ArmsLengthHandler implements Callable<Void> {
    @Override
    public Void call() throws Exception {
        final ClassLoader contextClassLoader = Thread.currentThread().getContextClassLoader();
        LogManager.getLogger().info("CCL is {}", contextClassLoader);
        final Class<?> testClass = Class.forName("net.minecraftforge.coremods.testjar.TestClass", true, contextClassLoader);
        assertFalse((boolean)testClass.getMethod("testMethod").invoke(null));

        boolean result = (boolean)testClass.getMethod("testInsert").invoke(null);
        assertFalse(result);
        final Class<?> redirectClass = Class.forName("net.minecraftforge.coremods.testjar.RedirectClass", true, contextClassLoader);
        assertEquals(1, (int) redirectClass.getMethod("getAfterCallCount").invoke(null));
        assertEquals(1, (int) redirectClass.getMethod("getBeforeCallCount").invoke(null));
        return null;
    }
}
