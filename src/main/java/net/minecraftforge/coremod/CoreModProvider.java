/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod;

import cpw.mods.modlauncher.api.*;
import net.minecraftforge.forgespi.coremod.*;

import java.util.*;

public class CoreModProvider implements ICoreModProvider {
    private final CoreModEngine engine = new CoreModEngine();
    @Override
    public void addCoreMod(final ICoreModFile file) {
        engine.loadCoreMod(file);
    }

    @Override
    public List<ITransformer<?>> getCoreModTransformers() {
        return engine.initializeCoreMods();
    }
}
