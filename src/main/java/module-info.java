/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
module net.minecraftforge.coremod {
    // CoreMods framework
    exports net.minecraftforge.coremod;
    // ASMAPI
    exports net.minecraftforge.coremod.api;

    requires cpw.mods.modlauncher;
    requires net.minecraftforge.forgespi;
    requires org.apache.logging.log4j;
    requires org.openjdk.nashorn;
    requires org.objectweb.asm.util;

    requires static org.jetbrains.annotations;

    provides net.minecraftforge.forgespi.coremod.ICoreModProvider
        with net.minecraftforge.coremod.CoreModProvider;
}
