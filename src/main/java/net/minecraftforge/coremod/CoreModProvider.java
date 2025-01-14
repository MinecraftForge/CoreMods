/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod;

import cpw.mods.modlauncher.api.ITransformer;
import net.minecraftforge.forgespi.coremod.ICoreModFile;
import net.minecraftforge.forgespi.coremod.ICoreModProvider;

import java.util.List;

/**
 * Exposes the CoreMods system to external systems via ForgeSPI (i.e. FML).
 */
public class CoreModProvider implements ICoreModProvider {
    private final CoreModEngine engine = new CoreModEngine();

    @SuppressWarnings("exports")
    @Override
    public void addCoreMod(final ICoreModFile file) {
        this.engine.loadCoreMod(file);
    }

    @Override
    public List<ITransformer<?>> getCoreModTransformers() {
        return this.engine.initializeCoreMods();
    }
}
