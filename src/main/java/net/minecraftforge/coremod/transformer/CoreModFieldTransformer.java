/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod.transformer;

import cpw.mods.modlauncher.api.ITransformer;
import net.minecraftforge.coremod.CoreMod;
import org.objectweb.asm.tree.FieldNode;

import java.util.Set;
import java.util.function.Function;

public class CoreModFieldTransformer extends CoreModBaseTransformer<FieldNode> implements ITransformer<FieldNode> {
    public CoreModFieldTransformer(CoreMod coreMod, String coreName, Set<Target> targets, Function<FieldNode, FieldNode> function) {
        super(coreMod, coreName, targets, function);
    }

    @Override
    FieldNode runCoremod(FieldNode input) {
        LOGGER.debug(COREMOD, "Transforming {} with desc {}", input.name, input.desc);
        return function.apply(input);
    }
}
