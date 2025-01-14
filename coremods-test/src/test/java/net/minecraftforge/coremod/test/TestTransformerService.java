/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod.test;

import cpw.mods.jarhandling.SecureJar;
import cpw.mods.modlauncher.api.IEnvironment;
import cpw.mods.modlauncher.api.IModuleLayerManager;
import cpw.mods.modlauncher.api.ITransformationService;
import cpw.mods.modlauncher.api.ITransformer;
import cpw.mods.modlauncher.api.IncompatibleEnvironmentException;
import org.jetbrains.annotations.NotNull;
import java.nio.file.FileSystems;
import java.util.Arrays;
import java.util.List;
import java.util.Set;

public class TestTransformerService implements ITransformationService {
    @NotNull
    @Override
    public String name() {
        return "coremodtest";
    }

    @Override
    public void initialize(final IEnvironment environment) {
    }

    @Override
    public void onLoad(final IEnvironment env, final Set<String> otherServices) throws IncompatibleEnvironmentException {
    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @NotNull
    @Override
    public List<ITransformer> transformers() {
        return (List)TestLaunchTransformerBase.getTransformers();
    }

    @SuppressWarnings("resource")
    @Override
    public List<Resource> beginScanning(IEnvironment environment) {
        if (System.getProperty("test.harness.plugin")!=null) {
            return List.of(new Resource(IModuleLayerManager.Layer.PLUGIN,
                    Arrays.stream(System.getProperty("test.harness.plugin").split(","))
                            .map(FileSystems.getDefault()::getPath)
                            .map(SecureJar::from)
                            .toList()));
        } else if (System.getProperty("test.harness.service")!=null) {
            return List.of(new Resource(IModuleLayerManager.Layer.SERVICE,
                    Arrays.stream(System.getProperty("test.harness.service").split(","))
                            .map(FileSystems.getDefault()::getPath)
                            .map(SecureJar::from)
                            .toList()));
        } else {
            return List.of();
        }
    }

    @SuppressWarnings("resource")
    @Override
    public List<Resource> completeScan(IModuleLayerManager layerManager) {
        if (System.getProperty("test.harness.game")!=null) {
            return List.of(new Resource(IModuleLayerManager.Layer.GAME,
                    Arrays.stream(System.getProperty("test.harness.game").split(","))
                            .map(FileSystems.getDefault()::getPath)
                            .map(SecureJar::from)
                            .toList()));
        } else {
            return List.of();
        }
    }
}
