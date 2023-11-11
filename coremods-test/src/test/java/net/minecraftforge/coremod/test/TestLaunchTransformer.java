/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod.test;

import cpw.mods.modlauncher.Launcher;
import cpw.mods.modlauncher.TransformingClassLoader;
import cpw.mods.modlauncher.api.ITransformer;
import net.minecraftforge.coremod.CoreModEngine;

import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.concurrent.Callable;

public class TestLaunchTransformer {
    private static CoreModEngine cme = new CoreModEngine();
    public static List<ITransformer<?>> getTransformers() {
        return cme.initializeCoreMods();
    }

    @Test
    public void testCoreModLoading() {
        System.setProperty("test.harness", "out/production/classes,out/test/classes,out/testJars/classes,build/classes/java/main,build/classes/java/test,build/classes/java/testJars");
        System.setProperty("test.harness.callable", "net.minecraftforge.coremod.test.TestLaunchTransformer$Callback");

        cme.loadCoreMod(new JSFileLoader("src/test/javascript/testcoremod.js"));
        cme.loadCoreMod(new JSFileLoader("src/test/javascript/testcore2mod.js"));
        cme.loadCoreMod(new JSFileLoader("src/test/javascript/testmethodcoremod.js"));
        cme.loadCoreMod(new JSFileLoader("src/test/javascript/testmethodcoreinsert.js"));

        Launcher.main("--version", "1.0", "--launchTarget", "testharness");
    }

    public static class Callback {
        @SuppressWarnings("unchecked")
        public static Callable<Void> supplier() {
            final TransformingClassLoader contextClassLoader = (TransformingClassLoader) Thread.currentThread().getContextClassLoader();
            try {
                final Class<?> clazz = Class.forName("net.minecraftforge.coremod.test.ArmsLengthHandler", true, contextClassLoader);
                return (Callable<Void>) clazz.newInstance();
            } catch (ClassNotFoundException | IllegalAccessException | InstantiationException e) {
                throw new RuntimeException(e);
            }
        }
    }
}
