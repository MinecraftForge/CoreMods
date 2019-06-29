package net.minecraftforge.coremod.transformer;

import cpw.mods.modlauncher.api.ITransformer;
import jdk.nashorn.api.scripting.ScriptObjectMirror;
import net.minecraftforge.coremod.CoreMod;
import org.objectweb.asm.tree.ClassNode;

import java.util.Set;

public class CoreModClassTransformer extends CoreModBaseTransformer<ClassNode> implements ITransformer<ClassNode> {
    public CoreModClassTransformer(CoreMod coreMod, String coreName, Set<Target> targets, ScriptObjectMirror function) {
        super(coreMod, coreName, targets, function);
    }

    @Override
    ClassNode runCoremod(ClassNode input) {
        LOGGER.debug(XFORM_MARKER, "Transforming {}", input.name);
        return (ClassNode) function.call(function, input);
    }
}
