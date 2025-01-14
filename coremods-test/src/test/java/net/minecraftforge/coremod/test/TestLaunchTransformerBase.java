/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod.test;

import cpw.mods.modlauncher.Launcher;
import cpw.mods.modlauncher.api.ITransformer;
import cpw.mods.modlauncher.api.ServiceRunner;
import net.minecraftforge.coremod.CoreModEngine;
import net.minecraftforge.coremod.testjar.TestMarker;
import net.minecraftforge.forgespi.coremod.ICoreModFile;
import net.minecraftforge.securemodules.SecureModuleClassLoader;
import net.minecraftforge.unsafe.UnsafeHacks;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInfo;

import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodType;
import java.nio.file.Paths;
import java.util.List;
import java.util.function.BiConsumer;
import java.util.stream.Collectors;

public class TestLaunchTransformerBase {
    private static final String CLASS_NAME = "test.class";
    private static final String METHOD_NAME = "test.method";
    private static final String TRANSFORMED = "test.transformed";

    private static CoreModEngine cme;
    public static List<ITransformer<?>> getTransformers() {
        return cme.initializeCoreMods();
    }

    protected static BiConsumer<CoreModEngine, String> LOAD_CORE_MOD = getLoadCoreMod();

    @BeforeEach
    public void setup(TestInfo testInfo) {
        System.setProperty(CLASS_NAME, testInfo.getTestClass().get().getName());
        System.setProperty(METHOD_NAME, testInfo.getTestMethod().get().getName());
        cme = new CoreModEngine();
    }

    @AfterEach
    public void teardown() {
        System.clearProperty(CLASS_NAME);
        System.clearProperty(METHOD_NAME);
        cme = null;
    }

    protected static BiConsumer<CoreModEngine, String> getLoadCoreMod() {
        try {
            var loadCoreMod = CoreModEngine.class.getDeclaredMethod("loadCoreMod", ICoreModFile.class);
            UnsafeHacks.setAccessible(loadCoreMod);
            return (engine, name) -> {
                try {
                    loadCoreMod.invoke(engine, new JSFileLoader(name));
                } catch (Throwable e) {
                    sneak(e);
                }
            };
        } catch (Throwable e) {
            return sneak(e);
        }
    }

    protected void loadCoremod(String name) {
        if (!getTransformed())
            LOAD_CORE_MOD.accept(cme, name);
    }

    private static final String getPath(Class<?> clz) {
        try {
            return Paths.get(clz.getProtectionDomain().getCodeSource().getLocation().toURI()).toAbsolutePath().toString();
        } catch (Throwable e) {
            return sneak(e);
        }
    }

    protected boolean isTransformed() {
        if (getTransformed())
            return true;

        var jars = List.of(
            getPath(TestTransformerService.class),
            getPath(TestMarker.class)
        );

        System.setProperty("test.harness.game", jars.stream().collect(Collectors.joining(",")));
        System.setProperty("test.harness.callable", Callback.class.getName());

        try {
            System.setProperty(TRANSFORMED, "true");
            Launcher.main("--version", "1.0", "--launchTarget", "testharness");
        } catch (Throwable e) {
            sneak(e);
        } finally {
            System.clearProperty(TRANSFORMED);
        }

        return false;
    }

    @SuppressWarnings("unchecked")
    protected <T> Class<T> getTransformedClass(String name) {
        var ccl = Thread.currentThread().getContextClassLoader();
        Assertions.assertInstanceOf(SecureModuleClassLoader.class, ccl, "ContextClassLoader is not TransformingClassLoader");
        try {
            return (Class<T>) Class.forName(name, false, ccl);
        } catch (Throwable e) {
            return sneak(e);
        }
    }

    private boolean getTransformed() {
        return System.getProperty(TRANSFORMED) != null;
    }

    //@Test
    public void testCoreModLoading() {
        System.setProperty("test.harness.game", "out/production/classes,out/test/classes,out/testJars/classes,build/classes/java/main,build/classes/java/test,build/classes/java/testJars");
        System.setProperty("test.harness.callable", "net.minecraftforge.coremod.test.TestLaunchTransformer$Callback");

        try {
            cme = new CoreModEngine();
            var loadCoreMod = cme.getClass().getDeclaredMethod("loadCoreMod", ICoreModFile.class);
            UnsafeHacks.setAccessible(loadCoreMod);
            loadCoreMod.invoke(cme, new JSFileLoader("src/test/javascript/testcoremod.js"));
            loadCoreMod.invoke(cme, new JSFileLoader("src/test/javascript/testcore2mod.js"));
            loadCoreMod.invoke(cme, new JSFileLoader("src/test/javascript/testmethodcoremod.js"));
            loadCoreMod.invoke(cme, new JSFileLoader("src/test/javascript/testmethodcoreinsert.js"));

            Launcher.main("--version", "1.0", "--launchTarget", "testharness");
        } catch (Throwable e) {
            sneak(e);
        }
    }

    public static class Callback {
        public static ServiceRunner supplier() {
            return () -> {
                try {
                    var ccl = Thread.currentThread().getContextClassLoader();
                    var cls = Class.forName(System.getProperty(CLASS_NAME), true, ccl);
                    var inst = cls.getDeclaredConstructor().newInstance();
                    var handle = MethodHandles.lookup().findVirtual(cls, System.getProperty(METHOD_NAME), MethodType.methodType(void.class));
                    handle.invoke(inst);
                } catch (Throwable e) {
                    sneak(e);
                }
            };
        }
    }

    @SuppressWarnings("unchecked")
    private static <E extends Throwable, R> R sneak(Throwable e) throws E {
        throw (E)e;
    }
}
