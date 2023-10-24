/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod.test;

import cpw.mods.modlauncher.api.IEnvironment;
import cpw.mods.modlauncher.api.ITransformationService;
import cpw.mods.modlauncher.api.ITransformer;
import cpw.mods.modlauncher.api.IncompatibleEnvironmentException;
import org.jetbrains.annotations.NotNull;

import java.util.List;
import java.util.Set;

public class TestTransformerService implements ITransformationService {

    private List<ITransformer<?>> transformers;

    @NotNull
    @Override
    public String name() {
        return "coremodtest";
    }

    @Override
    public void initialize(final IEnvironment environment) {
    }

    @Override
    public List<Resource> beginScanning(final IEnvironment environment) {
        return List.of();
    }

    @Override
    public void onLoad(final IEnvironment env, final Set<String> otherServices) throws IncompatibleEnvironmentException {

    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @NotNull
    @Override
    public List<ITransformer> transformers() {
        transformers = TestLaunchTransformer.getTransformers();
        return (List)transformers;
    }
}
