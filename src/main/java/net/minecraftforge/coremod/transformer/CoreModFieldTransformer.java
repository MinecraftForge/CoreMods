package net.minecraftforge.coremod.transformer;

import jdk.nashorn.api.scripting.ScriptObjectMirror;
import net.minecraftforge.coremod.CoreMod;
import org.objectweb.asm.tree.FieldNode;

import java.util.Set;

public class CoreModFieldTransformer extends CoreModBaseTransformer<FieldNode> {
    public CoreModFieldTransformer(CoreMod coreMod, String coreName, Set<Target> targets, ScriptObjectMirror function) {
        super(coreMod, coreName, targets, function);
    }

    @Override
    FieldNode runCoremod(FieldNode input) {
        LOGGER.debug(XFORM_MARKER, "Transforming {} with desc {}", input.name, input.desc);
        return (FieldNode) function.call(function, input);
    }
}
