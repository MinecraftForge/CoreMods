package net.minecraftforge.coremod.transformer;

import cpw.mods.modlauncher.api.ITransformer;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import net.minecraftforge.coremod.CoreMod;
import org.objectweb.asm.tree.MethodNode;

import java.util.Set;

public class CoreModMethodTransformer extends CoreModBaseTransformer<MethodNode> implements ITransformer<MethodNode> {
    public CoreModMethodTransformer(CoreMod coreMod, String coreName, Set<Target> targets, ScriptObjectMirror function) {
        super(coreMod, coreName, targets, function);
    }

    @Override
    MethodNode runCoremod(MethodNode input) {
        LOGGER.debug(COREMOD, "Transforming {} with desc {}", input.name, input.desc);
        return (MethodNode) function.call(function, input);
    }
}
