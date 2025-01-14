/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */

package net.minecraftforge.coremod.testjar;

public class TestClass {
    public static boolean False() {
        return false;
    }

    public static int[] testCounter() {
        var counts = new Counter();
        counts.push();
        return counts.getCounts();
    }

    public static String testString() {
        return "raw";
    }
}
