/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod.test;

import org.junit.jupiter.api.Test;

import net.minecraftforge.coremod.testjar.TestClass;

import static org.junit.jupiter.api.Assertions.*;

public class CoreModTests extends TestLaunchTransformerBase {

    @Test
    public void testModifyMethod() throws Exception {
        loadCoremod("test_method_manual.js");

        if (!isTransformed()) return;

        // Manually iterates the instructions and replace CONST_0 with CONST_1
        assertTrue(TestClass.False(), "Transformer failed");
    }

    @Test
    public void testInsertRemove() throws Exception {
        loadCoremod("test_insert_remove.js");

        if (!isTransformed()) return;

        // Replaces the push() with increment(), which will make the return {1}
        assertArrayEquals(new int[]{1}, TestClass.testCounter(), "Transformer failed");
    }

    @Test
    public void testInsertBefore() throws Exception {
        loadCoremod("test_insert_before.js");

        if (!isTransformed()) return;

        // Inserts increment() before the push() call, which will make the return {1, 0}
        assertArrayEquals(new int[]{1, 0}, TestClass.testCounter(), "Transformer failed");
    }

    @Test
    public void testInsertAfter() throws Exception {
        loadCoremod("test_insert_after.js");

        if (!isTransformed()) return;

        // Inserts increment() after the push() call, which will make the return {0, 1}
        assertArrayEquals(new int[]{0, 1}, TestClass.testCounter(), "Transformer failed");
    }

    @Test
    public void testLoadData() throws Exception {
        loadCoremod("test_load_data.js");

        if (!isTransformed()) return;

        // Loads a json file containing a string
        assertEquals("transformed", TestClass.testString(), "Transformer failed");
    }

    @Test
    public void testLoadFile() throws Exception {
        loadCoremod("test_load_file.js");

        if (!isTransformed()) return;

        // Loads a javascript file and uses a function from it
        assertEquals("transformed", TestClass.testString(), "Transformer failed");
    }
}
