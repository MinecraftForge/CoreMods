/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
open module net.minecraftforge.coremods.test {
    requires cpw.mods.modlauncher;
    requires net.minecraftforge.forgespi;
    requires net.minecraftforge.coremod;
    requires org.junit.jupiter.api;
    requires org.apache.logging.log4j;
    requires org.objectweb.asm.tree;
    requires static org.jetbrains.annotations;
    requires net.minecraftforge.unsafe;
    requires static net.minecraftforge.coremod.testjar;
    requires cpw.mods.securejarhandler;

    provides cpw.mods.modlauncher.api.ITransformationService
        with net.minecraftforge.coremod.test.TestTransformerService;
}
