/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod.test;

import net.minecraftforge.coremod.CoreModEngine;

import java.lang.reflect.InvocationTargetException;
import java.util.List;
import java.util.stream.Collectors;

import net.minecraftforge.forgespi.coremod.ICoreModFile;
import net.minecraftforge.unsafe.UnsafeHacks;
import org.junit.jupiter.api.Test;
import org.objectweb.asm.tree.ClassNode;

import cpw.mods.modlauncher.api.ITransformer;

public class CoreModTest {

    @SuppressWarnings("unchecked")
    @Test
    void testJSLoading() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        final CoreModEngine coreModEngine = new CoreModEngine();
        var loadCoreMod = coreModEngine.getClass().getMethod("loadCoreMod", ICoreModFile.class);
        UnsafeHacks.setAccessible(loadCoreMod);
        loadCoreMod.invoke(coreModEngine, new JSFileLoader("src/test/javascript/testcoremod.js"));
        loadCoreMod.invoke(coreModEngine, new JSFileLoader("src/test/javascript/testcore2mod.js"));
        loadCoreMod.invoke(coreModEngine, new JSFileLoader("src/test/javascript/testdata.js"));
        final List<ITransformer<?>> iTransformers = coreModEngine.initializeCoreMods();
        iTransformers.forEach(t -> {
            System.out.printf("targ: %s\n", t.targets().stream().map(ITransformer.Target::getClassName).collect(Collectors.joining(",")));
            ClassNode cn = new ClassNode();
            cn.name = "HelloWorld";
            ClassNode newcn = ((ITransformer<ClassNode>)t).transform(cn, null);
            System.out.println(newcn.methods.stream().map(m->m.name).collect(Collectors.joining(",")));
        });
    }
}
