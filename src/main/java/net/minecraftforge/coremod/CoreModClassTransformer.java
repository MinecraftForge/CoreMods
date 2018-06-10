package net.minecraftforge.coremod;

import cpw.mods.modlauncher.api.*;
import jdk.nashorn.api.scripting.*;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;
import org.objectweb.asm.tree.*;

import javax.annotation.*;
import java.util.*;

public class CoreModClassTransformer implements ITransformer<ClassNode> {
    private static final Logger LOGGER = LogManager.getLogger("CoreMod");
    private static final Marker XFORM_MARKER = MarkerManager.getMarker("XFORM");
    private final CoreMod coreMod;
    private final Set<Target> targets;
    private final ScriptObjectMirror function;
    private final String coreName;

    CoreModClassTransformer(CoreMod coreMod, final String coreName, final Set<Target> targets, final ScriptObjectMirror function) {
        this.coreMod = coreMod;
        this.coreName = coreName;
        this.targets = targets;
        this.function = function;
    }

    @Nonnull
    @Override
    public ClassNode transform(final ClassNode input, final ITransformerVotingContext context) {
        LOGGER.debug(XFORM_MARKER, "Transforming {}", input.name);
        ClassNode result = input;
        try {
            result = (ClassNode) function.call(function, input);
        } catch (Exception e) {
            LOGGER.error(XFORM_MARKER, "Error occurred applying transform of coremod {} function {}", e, this.coreMod.getPath(), this.coreName);
        }
        return result;
    }

    @Nonnull
    @Override
    public TransformerVoteResult castVote(final ITransformerVotingContext context) {
        return TransformerVoteResult.YES;
    }

    @Nonnull
    @Override
    public Set<Target> targets() {
        return targets;
    }
}
