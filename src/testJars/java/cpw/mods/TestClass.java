/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package cpw.mods;

public class TestClass {
    public static void cheese() {
        System.out.println("hello");
    }

    public static boolean testMethod() {
        return true;
    }

    public static void main(String... args) {
        cheese();
    }

    public static boolean testInsert() {
        testMethod1();
        boolean result = testMethod2();
        testMethod1();
        return result;
    }

    public static long testMethod1() {
        return (long) (Math.random() * 3290L);
    }

    public static boolean testMethod2() {
        return true;
    }
}
