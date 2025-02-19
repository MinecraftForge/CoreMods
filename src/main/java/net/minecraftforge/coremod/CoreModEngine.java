/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod;

import cpw.mods.modlauncher.Launcher;
import cpw.mods.modlauncher.api.ITransformer;
import cpw.mods.modlauncher.api.TypesafeMap;
import net.minecraftforge.forgespi.coremod.ICoreModFile;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;

import javax.script.ScriptContext;
import javax.script.ScriptEngine;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * The global coremod engine, responsible for loading and initializing coremods.
 */
public class CoreModEngine {
    private static final Logger LOGGER = LogManager.getLogger();
    private static final Marker COREMOD = MarkerManager.getMarker("COREMOD");
    private List<CoreMod> coreMods = new ArrayList<>();

    static final Set<String> ALLOWED_PACKAGES = Set.of(
        "java.util",
        "java.util.function",
        "org.objectweb.asm.util" // ASM util has nice debugging things like Trace visitors
    );

    static final Set<String> ALLOWED_CLASSES = Set.of(
        "net.minecraftforge.coremod.api.ASMAPI", "org.objectweb.asm.Opcodes",

        // Editing the code of methods
        "org.objectweb.asm.tree.AbstractInsnNode", "org.objectweb.asm.tree.FieldInsnNode",
        "org.objectweb.asm.tree.FrameNode", "org.objectweb.asm.tree.IincInsnNode",
        "org.objectweb.asm.tree.InsnNode", "org.objectweb.asm.tree.IntInsnNode",
        "org.objectweb.asm.tree.InsnList", "org.objectweb.asm.tree.InvokeDynamicInsnNode",
        "org.objectweb.asm.tree.JumpInsnNode", "org.objectweb.asm.tree.LabelNode",
        "org.objectweb.asm.tree.LdcInsnNode", "org.objectweb.asm.tree.LineNumberNode",
        "org.objectweb.asm.tree.LocalVariableAnnotationNode", "org.objectweb.asm.tree.LocalVariableNode",
        "org.objectweb.asm.tree.LookupSwitchInsnNode", "org.objectweb.asm.tree.MethodInsnNode",
        "org.objectweb.asm.tree.MultiANewArrayInsnNode", "org.objectweb.asm.tree.TableSwitchInsnNode",
        "org.objectweb.asm.tree.TryCatchBlockNode", "org.objectweb.asm.tree.TypeAnnotationNode",
        "org.objectweb.asm.tree.TypeInsnNode", "org.objectweb.asm.tree.VarInsnNode",

        // Adding new fields to classes
        "org.objectweb.asm.tree.FieldNode",

        // Adding new methods to classes
        "org.objectweb.asm.tree.MethodNode", "org.objectweb.asm.tree.ParameterNode",

        // Misc stuff referenced in above classes that's probably useful
        "org.objectweb.asm.Attribute", "org.objectweb.asm.Handle",
        "org.objectweb.asm.Label", "org.objectweb.asm.Type",
        "org.objectweb.asm.TypePath", "org.objectweb.asm.TypeReference"
    );

    /**
     * Whether to preserve the legacy behavior of
     * {@link net.minecraftforge.coremod.api.ASMAPI#findFirstInstructionBefore(org.objectweb.asm.tree.MethodNode, int,
     * int)} for backwards-compatibility.
     * <p>
     * In Forge's case, this is set by FML in Minecraft 1.21.1 and earlier, but not in 1.21.3 and later.
     *
     * @see net.minecraftforge.coremod.api.ASMAPI#findFirstInstructionBefore(org.objectweb.asm.tree.MethodNode, int,
     *     int)
     */
    public static final boolean DO_NOT_FIX_INSNBEFORE = shouldntFixInsnBefore();

    private static final boolean shouldntFixInsnBefore() {
        if (Launcher.INSTANCE == null)
            return false;

        var blackboardVar = Launcher.INSTANCE.blackboard().get(TypesafeMap.Key.getOrCreate(Launcher.INSTANCE.blackboard(), "coremods.use_old_findFirstInstructionBefore", Boolean.class));
        if (blackboardVar.isPresent() && blackboardVar.get()) {
            LOGGER.debug("CoreMods will preserve legacy behavior of ASMAPI.findFirstInstructionBefore for backwards-compatibility");
            return true;
        }
        return false;
    }

    void loadCoreMod(ICoreModFile coremod) {
        // We have a factory per coremod, to provide namespace and functional isolation between coremods
        final ScriptEngine scriptEngine = NashornFactory.createEngine();
        final ScriptContext jsContext = scriptEngine.getContext();
        // remove the load, loadWithNewGlobal, exit and quit methods from javascript.
        // They don't serve a useful purpose and can cause annoying holes in what is
        // meant to be a sandboxed environment.
        jsContext.removeAttribute("load", jsContext.getAttributesScope("load"));
        jsContext.removeAttribute("quit", jsContext.getAttributesScope("quit"));
        jsContext.removeAttribute("loadWithNewGlobal", jsContext.getAttributesScope("loadWithNewGlobal"));
        jsContext.removeAttribute("exit", jsContext.getAttributesScope("exit"));
        this.coreMods.add(new CoreMod(coremod, scriptEngine));
    }

    static boolean checkClass(String s) {
        return ALLOWED_CLASSES.contains(s) || (s.lastIndexOf('.') != -1 && ALLOWED_PACKAGES.contains(s.substring(0, s.lastIndexOf('.'))));
    }

    /**
     * Initializes all coremods that were added by any {@link CoreModProvider}s.
     *
     * @return A list of transformers given by the coremods
     */
    public List<ITransformer<?>> initializeCoreMods() {
        for (CoreMod coreMod : this.coreMods) this.initialize(coreMod);
        return this.coreMods.stream().map(CoreMod::buildTransformers).flatMap(List::stream).collect(Collectors.toList());
    }

    private void initialize(final CoreMod coreMod) {
        LOGGER.debug(COREMOD, "Loading CoreMod from {}", coreMod.getPath());
        coreMod.initialize();
        if (coreMod.hasError()) {
            LOGGER.error(COREMOD, "Error occurred initializing CoreMod", coreMod.getError());
        } else {
            LOGGER.debug(COREMOD, "CoreMod loaded successfully");
        }
    }
}
