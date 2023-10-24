/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod.transformer;

import cpw.mods.modlauncher.api.ITransformer;
import net.minecraftforge.coremod.CoreMod;
import org.objectweb.asm.tree.MethodNode;

import java.util.Set;
import java.util.function.Function;

public class CoreModMethodTransformer extends CoreModBaseTransformer<MethodNode> implements ITransformer<MethodNode> {
    public CoreModMethodTransformer(CoreMod coreMod, String coreName, Set<Target> targets, Function<MethodNode, MethodNode> function) {
        super(coreMod, coreName, targets, function);
    }

    @Override
    MethodNode runCoremod(MethodNode input) {
        LOGGER.debug(COREMOD, "Transforming {} with desc {}", input.name, input.desc);
        return function.apply(input);
    }
}
