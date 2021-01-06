package net.minecraftforge.coremod.transformer;

import cpw.mods.modlauncher.api.ITransformer;
import net.minecraftforge.coremod.CoreMod;
import org.objectweb.asm.tree.ClassNode;

import java.util.Set;
import java.util.function.Function;

public class CoreModClassTransformer extends CoreModBaseTransformer<ClassNode> implements ITransformer<ClassNode> {
    public CoreModClassTransformer(CoreMod coreMod, String coreName, Set<Target> targets, Function<ClassNode, ClassNode> function) {
        super(coreMod, coreName, targets, function);
    }

    @Override
    ClassNode runCoremod(ClassNode input) {
        LOGGER.debug(COREMOD, "Transforming {}", input.name);
        return function.apply(input);
    }
}
