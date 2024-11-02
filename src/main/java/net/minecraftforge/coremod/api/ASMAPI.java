/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod.api;

import cpw.mods.modlauncher.Launcher;
import cpw.mods.modlauncher.api.INameMappingService;
import net.minecraftforge.coremod.CoreModEngine;
import net.minecraftforge.coremod.CoreModTracker;
import org.jetbrains.annotations.Nullable;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.tree.*;
import org.objectweb.asm.util.Textifier;
import org.objectweb.asm.util.TraceClassVisitor;
import org.objectweb.asm.util.TraceMethodVisitor;

import javax.script.ScriptException;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.ListIterator;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Function;

/**
 * Helper methods for working with ASM. The goal of this class is to provide several assisting methods for common tasks
 * to prevent boilerplate code, excessive imports, unnecessary loops, and to provide a more user-friendly API for
 * coremod developers.
 */
@SuppressWarnings("unused") // annoying IDE warnings
public class ASMAPI {
    /* BUILDING INSTRUCTION LISTS */

    /**
     * Builds a new {@link InsnList} out of the specified {@link AbstractInsnNode}s.
     *
     * @param nodes The instructions you want to add
     * @return A new list with the instructions
     */
    public static InsnList listOf(AbstractInsnNode... nodes) {
        InsnList list = new InsnList();
        for (AbstractInsnNode node : nodes) list.add(node);
        return list;
    }


    /* INSTRUCTION INJECTION */

    /**
     * The mode in which the given code should be inserted.
     */
    public enum InsertMode {
        INSERT_BEFORE, INSERT_AFTER, REMOVE_ORIGINAL
    }

    /**
     * Inserts/replaces an instruction, with respect to the given {@link InsertMode}, on the given instruction.
     *
     * @param method   The method to insert the instruction into
     * @param insn     The old instruction where the new instruction should be inserted into
     * @param toInsert The instruction to be inserted
     * @param mode     How the instruction should be inserted
     * @return {@code true} if the list was inserted, {@code false} otherwise
     */
    public static boolean insertInsn(MethodNode method, AbstractInsnNode insn, AbstractInsnNode toInsert, InsertMode mode) {
        if (!method.instructions.contains(insn)) return false;

        switch (mode) {
            case INSERT_BEFORE -> method.instructions.insertBefore(insn, toInsert);
            case INSERT_AFTER -> method.instructions.insert(insn, toInsert);
            case REMOVE_ORIGINAL -> method.instructions.set(insn, toInsert);
        }

        return true;
    }

    /**
     * Inserts/replaces an instruction, with respect to the given {@link InsertMode}, on the first
     * {@link MethodInsnNode} that matches the parameters of these functions in the method provided. Only the first
     * matching node is targeted, all other matches are ignored.
     *
     * @param method   The method to insert the instruction into
     * @param type     The type of the method call to search for
     * @param owner    The owner of the method call to search for
     * @param name     The name of the method call to search for (you may want to use {@link #mapMethod(String)} if this
     *                 is a srg name)
     * @param desc     The desc of the method call to search for
     * @param toInsert The instruction to be inserted
     * @param mode     How the instruction should be inserted
     * @return {@code true} if the method call was found and the list was inserted, {@code false} otherwise
     *
     * @apiNote This method mostly exists for the sake of backwards-compatibility. It may be prudent to use
     *     {@link #insertInsn(MethodNode, AbstractInsnNode, AbstractInsnNode, InsertMode)} instead if you want to value
     *     readability.
     */
    public static boolean insertInsn(MethodNode method, MethodType type, String owner, String name, String desc, AbstractInsnNode toInsert, InsertMode mode) {
        var insn = findFirstMethodCall(method, type, owner, name, desc);
        if (insn == null) return false;

        return insertInsn(method, insn, toInsert, mode);
    }

    /**
     * Inserts/replaces an instruction list, with respect to the given {@link InsertMode}, on the given instruction.
     *
     * @param method The method to insert the list into
     * @param list   The list to be inserted
     * @param mode   How the list should be inserted
     * @return {@code true} if the list was inserted, {@code false} otherwise
     */
    public static boolean insertInsnList(MethodNode method, AbstractInsnNode insn, InsnList list, InsertMode mode) {
        if (!method.instructions.contains(insn)) return false;

        if (mode == InsertMode.INSERT_BEFORE)
            method.instructions.insertBefore(insn, list);
        else
            method.instructions.insert(insn, list);

        if (mode == InsertMode.REMOVE_ORIGINAL)
            method.instructions.remove(insn);

        return true;
    }

    /**
     * Inserts/replaces an instruction list, with respect to the given {@link InsertMode}, on the first
     * {@link MethodInsnNode} that matches the parameters of these functions in the method provided. Only the first
     * matching node is targeted, all other matches are ignored.
     *
     * @param method The method to insert the list into
     * @param type   The type of the method call to search for
     * @param owner  The owner of the method call to search for
     * @param name   The name of the method call to search for (you may want to use {@link #mapMethod(String)} if this
     *               is a srg name)
     * @param desc   The desc of the method call to search for
     * @param list   The list to be inserted
     * @param mode   How the list should be inserted
     * @return {@code true} if the method call was found and the list was inserted, {@code false} otherwise
     *
     * @apiNote This method mostly exists for the sake of backwards-compatibility. It may be prudent to use
     *     {@link #insertInsnList(MethodNode, AbstractInsnNode, InsnList, InsertMode)} instead if you want to value
     *     readability.
     */
    public static boolean insertInsnList(MethodNode method, MethodType type, String owner, String name, String desc, InsnList list, InsertMode mode) {
        var insn = findFirstMethodCall(method, type, owner, name, desc);
        if (insn == null) return false;

        return insertInsnList(method, insn, list, mode);
    }

    /**
     * Injects a method call to the beginning of the given method.
     *
     * @param method The method to inject the method call into
     * @param insn   The method call to inject
     */
    public static void injectMethodCall(MethodNode method, MethodInsnNode insn) {
        method.instructions.insertBefore(method.instructions.getFirst(), insn);
    }

    /**
     * Injects a method call to the beginning of the given method.
     *
     * @param method The method to inject the call into
     * @param insn   The method call to inject
     * @deprecated Renamed to {@link #injectMethodCall(MethodNode, MethodInsnNode)}
     */
    @Deprecated(forRemoval = true, since = "6.0")
    public static void appendMethodCall(MethodNode method, MethodInsnNode insn) {
        injectMethodCall(method, insn);
    }


    /* INSTRUCTION SEARCHING */

    /**
     * The type of instruction. Useful for searching for a specfic instruction, especially for those that use opcode
     * {@code -1} or you need to ignore matching the opcode.
     *
     * @see AbstractInsnNode
     */
    public enum InsnType {
        INSN(AbstractInsnNode.INSN),
        INT_INSN(AbstractInsnNode.INT_INSN),
        VAR_INSN(AbstractInsnNode.VAR_INSN),
        TYPE_INSN(AbstractInsnNode.TYPE_INSN),
        FIELD_INSN(AbstractInsnNode.FIELD_INSN),
        METHOD_INSN(AbstractInsnNode.METHOD_INSN),
        INVOKE_DYNAMIC_INSN(AbstractInsnNode.INVOKE_DYNAMIC_INSN),
        JUMP_INSN(AbstractInsnNode.JUMP_INSN),
        LABEL(AbstractInsnNode.LABEL),
        LDC_INSN(AbstractInsnNode.LDC_INSN),
        IINC_INSN(AbstractInsnNode.IINC_INSN),
        TABLESWITCH_INSN(AbstractInsnNode.TABLESWITCH_INSN),
        LOOKUPSWITCH_INSN(AbstractInsnNode.LOOKUPSWITCH_INSN),
        MULTIANEWARRAY_INSN(AbstractInsnNode.MULTIANEWARRAY_INSN),
        FRAME(AbstractInsnNode.FRAME),
        LINE(AbstractInsnNode.LINE);

        private final int type;

        InsnType(int type) {
            this.type = type;
        }

        /**
         * Gets the type of the instruction represented in {@link AbstractInsnNode}.
         *
         * @return The type
         */
        public int get() {
            return type;
        }
    }

    /**
     * Finds the first instruction with matching opcode.
     *
     * @param method the method to search in
     * @param opcode the opcode to search for
     * @return the found instruction or {@code null} if none matched
     */
    public static @Nullable AbstractInsnNode findFirstInstruction(MethodNode method, int opcode) {
        return findFirstInstructionAfter(method, opcode, null, 0);
    }

    /**
     * Finds the first instruction with matching instruction type.
     *
     * @param method the method to search in
     * @param type   the instruction type to search for
     * @return the found instruction node or {@code null} if none matched
     */
    public static @Nullable AbstractInsnNode findFirstInstruction(MethodNode method, InsnType type) {
        return findFirstInstructionAfter(method, -2, type, 0);
    }

    /**
     * Finds the first instruction with matching opcode and instruction type.
     *
     * @param method the method to search in
     * @param opcode the opcode to search for
     * @param type   the instruction type to search for
     * @return the found instruction node or {@code null} if none matched
     */
    public static @Nullable AbstractInsnNode findFirstInstruction(MethodNode method, int opcode, InsnType type) {
        return findFirstInstructionAfter(method, opcode, type, 0);
    }

    /**
     * Finds the first instruction with matching opcode after the given start index.
     *
     * @param method     the method to search in
     * @param opcode     the opcode to search for
     * @param startIndex the index to start search after (inclusive)
     * @return the found instruction node or {@code null} if none matched after the given index
     */
    public static @Nullable AbstractInsnNode findFirstInstructionAfter(MethodNode method, int opcode, int startIndex) {
        return findFirstInstructionAfter(method, opcode, null, startIndex);
    }

    /**
     * Finds the first instruction with matching instruction type after the given start index.
     *
     * @param method     the method to search in
     * @param type       the instruction type to search for
     * @param startIndex the index to start search after (inclusive)
     * @return the found instruction node or {@code null} if none matched after the given index
     */
    public static @Nullable AbstractInsnNode findFirstInstructionAfter(MethodNode method, InsnType type, int startIndex) {
        return findFirstInstructionAfter(method, -2, type, startIndex);
    }

    /**
     * Finds the first instruction with matching opcode and instruction type after the given start index.
     *
     * @param method     the method to search in
     * @param opcode     the opcode to search for
     * @param type       the instruction type to search for
     * @param startIndex the index to start search after (inclusive)
     * @return the found instruction node or {@code null} if none matched after the given index
     */
    public static @Nullable AbstractInsnNode findFirstInstructionAfter(MethodNode method, int opcode, @Nullable InsnType type, int startIndex) {
        for (int i = Math.max(0, startIndex); i < method.instructions.size(); i++) {
            AbstractInsnNode ain = method.instructions.get(i);

            boolean opcodeMatch = opcode < -1 || ain.getOpcode() == opcode;
            boolean typeMatch = type == null || type.get() == ain.getType();
            if (opcodeMatch && typeMatch) return ain;
        }

        return null;
    }

    /**
     * Finds the first instruction with matching opcode before the given index in reverse search.
     *
     * @param method     the method to search in
     * @param opcode     the opcode to search for
     * @param startIndex the index at which to start searching (inclusive)
     * @return the found instruction node or {@code null} if none matched before the given startIndex
     *
     * @apiNote In Minecraft 1.21.1 and earlier, this method contains broken logic that ignores the
     *     {@code startIndex} parameter and searches for the requested instruction at the end of the method. This
     *     behavior is preserved to not disrupt older coremods. If you are on one of these older versions and need to
     *     use the fixed logic, please use {@link #findFirstInstructionBefore(MethodNode, int, int, boolean)}.
     */
    public static @Nullable AbstractInsnNode findFirstInstructionBefore(MethodNode method, int opcode, int startIndex) {
        return findFirstInstructionBefore(method, opcode, null, startIndex);
    }

    /**
     * Finds the first instruction with matching instruction type before the given index in reverse search.
     *
     * @param method     the method to search in
     * @param type       the instruction type to search for
     * @param startIndex the index at which to start searching (inclusive)
     * @return the found instruction node or {@code null} if none matched before the given startIndex
     *
     * @apiNote In Minecraft 1.21.1 and earlier, this method contains broken logic that ignores the
     *     {@code startIndex} parameter and searches for the requested instruction at the end of the method. This
     *     behavior is preserved to not disrupt older coremods. If you are on one of these older versions and need to
     *     use the fixed logic, please use {@link #findFirstInstructionBefore(MethodNode, int, int, boolean)}.
     */
    public static @Nullable AbstractInsnNode findFirstInstructionBefore(MethodNode method, InsnType type, int startIndex) {
        return findFirstInstructionBefore(method, -2, type, startIndex);
    }

    /**
     * Finds the first instruction with matching opcode before the given index in reverse search.
     *
     * @param method     the method to search in
     * @param opCode     the opcode to search for
     * @param startIndex the index at which to start searching (inclusive)
     * @param fixLogic   whether to use the fixed logic for finding instructions before the given startIndex
     *                   ({@code true} by default on versions since 1.21.3, {@code false} otherwise)
     * @return the found instruction node or {@code null} if none matched before the given startIndex
     */
    public static @Nullable AbstractInsnNode findFirstInstructionBefore(MethodNode method, int opCode, int startIndex, boolean fixLogic) {
        return findFirstInstructionBefore(method, opCode, null, startIndex, fixLogic);
    }

    /**
     * Finds the first instruction with matching instruction type before the given index in reverse search.
     *
     * @param method     the method to search in
     * @param type       the instruction type to search for
     * @param startIndex the index at which to start searching (inclusive)
     * @param fixLogic   whether to use the fixed logic for finding instructions before the given startIndex
     *                   ({@code true} by default on versions since 1.21.3, {@code false} otherwise)
     * @return the found instruction node or {@code null} if none matched before the given startIndex
     */
    public static @Nullable AbstractInsnNode findFirstInstructionBefore(MethodNode method, InsnType type, int startIndex, boolean fixLogic) {
        return findFirstInstructionBefore(method, -2, type, startIndex, fixLogic);
    }

    /**
     * Finds the first instruction with matching opcode and instruction type before the given index in reverse search.
     *
     * @param method     the method to search in
     * @param opCode     the opcode to search for
     * @param startIndex the index at which to start searching (inclusive)
     * @return the found instruction node or {@code null} if none matched before the given startIndex
     *
     * @apiNote In Minecraft 1.21.1 and earlier, this method contains broken logic that ignores the
     *     {@code startIndex} parameter and searches for the requested instruction at the end of the method. This
     *     behavior is preserved to not disrupt older coremods. If you are on one of these older versions and need to
     *     use the fixed logic, please use
     *     {@link #findFirstInstructionBefore(MethodNode, int, InsnType, int, boolean)}.
     */
    public static @Nullable AbstractInsnNode findFirstInstructionBefore(MethodNode method, int opCode, @Nullable InsnType type, int startIndex) {
        return findFirstInstructionBefore(method, opCode, type, startIndex, !CoreModEngine.DO_NOT_FIX_INSNBEFORE);
    }

    /**
     * Finds the first instruction with matching opcode and instruction type before the given index in reverse search.
     *
     * @param method     the method to search in
     * @param opCode     the opcode to search for
     * @param startIndex the index at which to start searching (inclusive)
     * @param fixLogic   whether to use the fixed logic for finding instructions before the given startIndex
     *                   ({@code true} by default on versions since 1.21.3, {@code false} otherwise)
     * @return the found instruction node or {@code null} if none matched before the given startIndex
     */
    public static @Nullable AbstractInsnNode findFirstInstructionBefore(MethodNode method, int opCode, @Nullable InsnType type, int startIndex, boolean fixLogic) {
        for (int i = fixLogic ? Math.min(method.instructions.size() - 1, startIndex) : startIndex; i >= 0; i--) {
            AbstractInsnNode ain = method.instructions.get(i);

            boolean opcodeMatch = opCode < -1 || ain.getOpcode() == opCode;
            boolean typeMatch = type == null || type.get() == ain.getType();
            if (opcodeMatch && typeMatch) return ain;
        }

        return null;
    }

    /**
     * Finds the first method call in the given method matching the given type, owner, name and descriptor.
     *
     * @param method     the method to search in
     * @param type       the type of method call to search for
     * @param owner      the method call's owner to search for
     * @param name       the method call's name
     * @param descriptor the method call's descriptor
     * @return the found method call node or {@code null} if none matched
     */
    public static @Nullable MethodInsnNode findFirstMethodCall(MethodNode method, MethodType type, String owner, String name, String descriptor) {
        return findFirstMethodCallAfter(method, type, owner, name, descriptor, 0);
    }

    /**
     * Finds the first method call in the given method matching the given type, owner, name and descriptor after the
     * instruction given index.
     *
     * @param method     the method to search in
     * @param type       the type of method call to search for
     * @param owner      the method call's owner to search for
     * @param name       the method call's name
     * @param descriptor the method call's descriptor
     * @param index      the index after which to start searching (inclusive)
     * @return the found method call node, {@code null} if none matched after the given index
     */
    public static @Nullable MethodInsnNode findFirstMethodCallAfter(MethodNode method, MethodType type, String owner, String name, String descriptor, int index) {
        for (int i = Math.max(0, index); i < method.instructions.size(); i++) {
            if (method.instructions.get(i) instanceof MethodInsnNode insn
                    && insn.getOpcode() == type.toOpcode()
                    && Objects.equals(insn.owner, owner)
                    && Objects.equals(insn.name, name)
                    && Objects.equals(insn.desc, descriptor)) {
                return insn;
            }
        }

        return null;
    }

    /**
     * Finds the first method call in the given method matching the given type, owner, name and descriptor before the
     * given index in reverse search.
     *
     * @param method     the method to search in
     * @param type       the type of method call to search for
     * @param owner      the method call's owner to search for
     * @param name       the method call's name
     * @param descriptor the method call's descriptor
     * @param index      the index at which to start searching (inclusive)
     * @return the found method call node or {@code null} if none matched before the given startIndex
     */
    public static @Nullable MethodInsnNode findFirstMethodCallBefore(MethodNode method, MethodType type, String owner, String name, String descriptor, int index) {
        for (int i = Math.min(method.instructions.size() - 1, index); i >= 0; i--) {
            if (method.instructions.get(i) instanceof MethodInsnNode insn
                    && insn.getOpcode() == type.toOpcode()
                    && Objects.equals(insn.owner, owner)
                    && Objects.equals(insn.name, name)
                    && Objects.equals(insn.desc, descriptor)) {
                return insn;
            }
        }

        return null;
    }

    /**
     * Finds the first field call in the given method matching the given opcode, owner, name and descriptor.
     *
     * @param method     the method to search in
     * @param opcode     the opcode of field call to search for
     * @param owner      the method call's owner to search for
     * @param name       the method call's name
     * @param descriptor the method call's descriptor
     * @return the found method call node or {@code null} if none matched
     */
    public static @Nullable FieldInsnNode findFirstFieldCall(MethodNode method, int opcode, String owner, String name, String descriptor) {
        return findFirstFieldCallAfter(method, opcode, owner, name, descriptor, 0);
    }

    /**
     * Finds the first field call in the given method matching the given opcode, owner, name and descriptor after the
     * instruction given index.
     *
     * @param method     the method to search in
     * @param opcode     the opcode of field call to search for
     * @param owner      the method call's owner to search for
     * @param name       the method call's name
     * @param descriptor the method call's descriptor
     * @param startIndex the index after which to start searching (inclusive)
     * @return the found method call node, {@code null} if none matched after the given index
     */
    public static @Nullable FieldInsnNode findFirstFieldCallAfter(MethodNode method, int opcode, String owner, String name, String descriptor, int startIndex) {
        for (int i = Math.max(0, startIndex); i < method.instructions.size(); i++) {
            if (method.instructions.get(i) instanceof FieldInsnNode insn
                    && insn.getOpcode() == opcode
                    && insn.owner.equals(owner)
                    && insn.name.equals(name)
                    && insn.desc.equals(descriptor)) {
                return insn;
            }
        }
        return null;
    }

    /**
     * Finds the first field call in the given method matching the given opcode, owner, name and descriptor before the
     * given index in reverse search.
     *
     * @param method     the method to search in
     * @param opcode     the opcode of field call to search for
     * @param owner      the method call's owner to search for
     * @param name       the method call's name
     * @param descriptor the method call's descriptor
     * @param startIndex the index at which to start searching (inclusive)
     * @return the found method call node or {@code null} if none matched before the given startIndex
     */
    public static @Nullable FieldInsnNode findFirstFieldCallBefore(MethodNode method, int opcode, String owner, String name, String descriptor, int startIndex) {
        for (int i = Math.min(method.instructions.size() - 1, startIndex); i >= 0; i--) {
            if (method.instructions.get(i) instanceof FieldInsnNode insn
                    && insn.getOpcode() == opcode
                    && insn.owner.equals(owner)
                    && insn.name.equals(name)
                    && insn.desc.equals(descriptor)) {
                return insn;
            }
        }
        return null;
    }


    /* CREATING AND FINDING METHODS */

    /**
     * Creates a new empty {@link MethodNode}.
     *
     * @return The created method node
     *
     * @see MethodNode#MethodNode(int)
     */
    public static MethodNode getMethodNode() {
        var method = new MethodNode(Opcodes.ASM9);

        // ASM usually creates an empty list for null exceptions on the other constructors
        // let's do this as well, just to make sure we don't run into problems later.
        method.exceptions = new ArrayList<>();

        return method;
    }

    /**
     * Creates a new empty {@link MethodNode} with the given access codes, name and descriptor.
     *
     * @param access     The access codes
     * @param name       The method name
     * @param descriptor The method descriptor
     * @return The created method node
     *
     * @see MethodNode#MethodNode(int, int, String, String, String, String[])
     */
    public static MethodNode getMethodNode(int access, String name, String descriptor) {
        return new MethodNode(Opcodes.ASM9, access, name, descriptor, null, null);
    }

    /**
     * Creates a new empty {@link MethodNode} with the given access codes, name, descriptor, and signature.
     *
     * @param access     The access codes
     * @param name       The method name
     * @param descriptor The method descriptor
     * @param signature  The method signature
     * @return The created method node
     *
     * @see MethodNode#MethodNode(int, int, String, String, String, String[])
     */
    public static MethodNode getMethodNode(int access, String name, String descriptor, @Nullable String signature) {
        return new MethodNode(Opcodes.ASM9, access, name, descriptor, signature, null);
    }

    /**
     * Creates a new empty {@link MethodNode} with the given access codes, name, descriptor, signature, and exceptions.
     *
     * @param access     The access codes
     * @param name       The method name
     * @param descriptor The method descriptor
     * @param signature  The method signature
     * @param exceptions The internal names of the method's exceptions
     * @return The created method node
     *
     * @see MethodNode#MethodNode(int, int, String, String, String, String[])
     */
    public static MethodNode getMethodNode(int access, String name, String descriptor, @Nullable String signature, @Nullable String[] exceptions) {
        return new MethodNode(Opcodes.ASM9, access, name, descriptor, signature, exceptions);
    }

    /**
     * Finds the first method node from the given class node that matches the given name and descriptor.
     *
     * @param clazz The class node to search
     * @param name  The name of the desired method
     * @param desc  The descriptor of the desired method
     * @return The found method node or {@code null} if none matched
     */
    public static @Nullable MethodNode findMethodNode(ClassNode clazz, String name, String desc) {
        return findMethodNode(clazz, name, desc, null, false);
    }

    /**
     * Finds the first method node from the given class node that matches the given name, descriptor, and signature.
     *
     * @param clazz     The class node to search
     * @param name      The name of the desired method
     * @param desc      The descriptor of the desired method
     * @param signature The signature of the desired method
     * @return The found method node or {@code null} if none matched
     *
     * @apiNote This method will attempt to match the signature of the method, even if it is {@code null}. It may be
     *     useful for that use case in particular. If you have no need to match the signature, consider using
     *     {@link #findMethodNode(ClassNode, String, String)}
     */
    public static @Nullable MethodNode findMethodNode(ClassNode clazz, String name, String desc, @Nullable String signature) {
        return findMethodNode(clazz, name, desc, signature, true);
    }

    private static @Nullable MethodNode findMethodNode(ClassNode clazz, String name, String desc, @Nullable String signature, boolean checkSignature) {
        for (MethodNode method : clazz.methods) {
            // we have to use Objects.equals here in case the found method has null attributes
            if (Objects.equals(method.name, name) && Objects.equals(method.desc, desc) && (!checkSignature || Objects.equals(method.signature, signature))) {
                return method;
            }
        }

        return null;
    }


    /* CREATING AND FINDING FIELDS */

    /**
     * Creates a new empty {@link FieldNode} with the given access codes, name, and descriptor.
     *
     * @param access     The access codes
     * @param name       The field name
     * @param descriptor The field descriptor
     * @return The created field node
     *
     * @see FieldNode#FieldNode(int, int, String, String, String, Object)
     */
    public static FieldNode getFieldNode(int access, String name, String descriptor) {
        return new FieldNode(Opcodes.ASM9, access, name, descriptor, null, null);
    }

    /**
     * Creates a new empty {@link FieldNode} with the given access codes, name, descriptor, and signature.
     *
     * @param access     The access codes
     * @param name       The field name
     * @param descriptor The field descriptor
     * @param signature  The field signature
     * @return The created field node
     *
     * @see FieldNode#FieldNode(int, int, String, String, String, Object)
     */
    public static FieldNode getFieldNode(int access, String name, String descriptor, @Nullable String signature) {
        return new FieldNode(Opcodes.ASM9, access, name, descriptor, signature, null);
    }

    /**
     * Creates a new empty {@link FieldNode} with the given access codes, name, descriptor, signature, and initial
     * object value.
     *
     * @param access     The access codes
     * @param name       The field name
     * @param descriptor The field descriptor
     * @param signature  The field signature
     * @param value      The initial value of the field
     * @return The created field node
     *
     * @see FieldNode#FieldNode(int, int, String, String, String, Object)
     */
    public static FieldNode getFieldNode(int access, String name, String descriptor, @Nullable String signature, String value) {
        return new FieldNode(Opcodes.ASM9, access, name, descriptor, signature, value);
    }

    /**
     * Creates a new empty {@link FieldNode} with the given access codes, name, descriptor, signature, and initial
     * number value.
     *
     * @param access     The access codes
     * @param name       The field name
     * @param descriptor The field descriptor
     * @param signature  The field signature
     * @param value      The initial value of the field
     * @param valueType  The number type of the initial value
     * @return The created field node
     *
     * @see FieldNode#FieldNode(int, int, String, String, String, Object)
     */
    public static FieldNode getFieldNode(int access, String name, String descriptor, @Nullable String signature, Number value, NumberType valueType) {
        return new FieldNode(Opcodes.ASM9, access, name, descriptor, signature, castNumber(value, valueType));
    }

    /**
     * Finds the first field node from the given class node that matches the given name and descriptor.
     *
     * @param clazz The class node to search
     * @param name  The name of the desired field
     * @param desc  The descriptor of the desired field
     * @return The found field node or {@code null} if none matched
     */
    public static @Nullable FieldNode findFieldNode(ClassNode clazz, String name, String desc) {
        return findFieldNode(clazz, name, desc, null, false);
    }

    /**
     * Finds the first field node from the given class node that matches the given name, descriptor, and signature.
     *
     * @param clazz     The class node to search
     * @param name      The name of the desired field
     * @param desc      The descriptor of the desired field
     * @param signature The signature of the desired field
     * @return The found field node or {@code null} if none matched
     *
     * @apiNote This method will attempt to match the signature of the field, even if it is {@code null}. It may be
     *     useful for that use case in particular. If you have no need to match the signature, consider using
     *     {@link #findFieldNode(ClassNode, String, String)}
     */
    public static @Nullable FieldNode findFieldNode(ClassNode clazz, String name, String desc, @Nullable String signature) {
        return findFieldNode(clazz, name, desc, signature, true);
    }

    private static @Nullable FieldNode findFieldNode(ClassNode clazz, String name, String desc, @Nullable String signature, boolean checkSignature) {
        for (FieldNode field : clazz.fields) {
            // we have to use Objects.equals here in case the found field has null attributes
            if (Objects.equals(field.name, name) && Objects.equals(field.desc, desc) && (!checkSignature || Objects.equals(field.signature, signature))) {
                return field;
            }
        }

        return null;
    }


    /* BUILDING METHOD CALLS */

    /**
     * Signifies the method invocation type. Mirrors "INVOKE-" opcodes from ASM.
     */
    public enum MethodType {
        VIRTUAL(Opcodes.INVOKEVIRTUAL),
        SPECIAL(Opcodes.INVOKESPECIAL),
        STATIC(Opcodes.INVOKESTATIC),
        INTERFACE(Opcodes.INVOKEINTERFACE),
        DYNAMIC(Opcodes.INVOKEDYNAMIC);

        private final int opcode;

        MethodType(int opcode) {
            this.opcode = opcode;
        }

        /**
         * Gets the opcode of the method type.
         *
         * @return The opcode
         */
        public int toOpcode() {
            return this.opcode;
        }
    }

    /**
     * Builds a new {@link MethodInsnNode} with the given parameters. The opcode of the method call is determined by the
     * given {@link MethodType}.
     *
     * @param type             The type of method call
     * @param ownerName        The method owner (class)
     * @param methodName       The method name
     * @param methodDescriptor The method descriptor
     * @return The built method call node
     */
    public static MethodInsnNode buildMethodCall(final MethodType type, final String ownerName, final String methodName, final String methodDescriptor) {
        return new MethodInsnNode(type.toOpcode(), ownerName, methodName, methodDescriptor, type == MethodType.INTERFACE);
    }

    /**
     * Builds a new {@link MethodInsnNode} with the given parameters. The opcode of the method call is determined by the
     * given {@link MethodType}.
     *
     * @param ownerName        The method owner (class)
     * @param methodName       The method name
     * @param methodDescriptor The method descriptor
     * @param type             The type of method call
     * @return The built method call node
     *
     * @deprecated Use {@link #buildMethodCall(MethodType, String, String, String)}
     */
    @Deprecated(forRemoval = true, since = "6.0") // when we major update, prefer the method type as first parameter
    public static MethodInsnNode buildMethodCall(final String ownerName, final String methodName, final String methodDescriptor, final MethodType type) {
        return new MethodInsnNode(type.toOpcode(), ownerName, methodName, methodDescriptor, type == MethodType.INTERFACE);
    }


    /* BUILDING FIELD CALLS */

    public static FieldInsnNode buildFieldCall(final int opcode, final String owner, final String name, final String desc) {
        return new FieldInsnNode(opcode, owner, name, desc);
    }


    /* LDC AND NUMBER TYPE HELPERS */

    /**
     * Signifies the type of number constant for a {@link NumberType}.
     */
    public enum NumberType {
        INTEGER(Number::intValue),
        FLOAT(Number::floatValue),
        LONG(Number::longValue),
        DOUBLE(Number::doubleValue);

        private final Function<Number, Object> mapper;

        NumberType(Function<Number, Object> mapper) {
            this.mapper = mapper;
        }
    }

    /**
     * Casts a given number to a given specific {@link NumberType}. This helps alleviate the problems that comes with
     * JavaScript's ambiguous number system.
     * <p>
     * The result is returned as an {@link Object} so it can be used as a value in various instructions that require
     * values, such as {@link FieldNode} and {@link LdcInsnNode}.
     *
     * @param value The number to cast
     * @param type  The type of number to cast to
     * @return The casted number
     */
    public static Object castNumber(final Number value, final NumberType type) {
        return type.mapper.apply(value);
    }

    /**
     * Builds a new {@link LdcInsnNode} with the given number value and {@link NumberType}.
     *
     * @param value The number value
     * @param type  The type of the number
     * @return The built LDC node
     */
    public static LdcInsnNode buildNumberLdcInsnNode(final Number value, final NumberType type) {
        return new LdcInsnNode(castNumber(value, type));
    }


    /* SPECIALIZED TRANSFORMATION */

    /**
     * Rewrites accesses to a specific field in the given class to a method-call.
     * <p>
     * The field specified by fieldName must be private and non-static. The method-call the field-access is redirected
     * to does not take any parameters and returns an object of the same type as the field. If no methodName is passed,
     * any method matching the described signature will be used as callable method.
     *
     * @param classNode  the class to rewrite the accesses in
     * @param fieldName  the field accesses should be redirected to
     * @param methodName the name of the method to redirect accesses through, or {@code null} if any method with
     *                   matching signature should be applicable
     * @apiNote This method was written as a special use case for Forge. It is not recommended to use this method
     *     unless you know what you are doing.
     */
    public static void redirectFieldToMethod(final ClassNode classNode, final String fieldName, @Nullable final String methodName) {
        MethodNode foundMethod = null;
        FieldNode foundField = null;
        for (FieldNode fieldNode : classNode.fields) {
            if (Objects.equals(fieldNode.name, fieldName)) {
                if (foundField == null) {
                    foundField = fieldNode;
                } else {
                    throw new IllegalStateException("Found multiple fields with name " + fieldName);
                }
            }
        }

        if (foundField == null) {
            throw new IllegalStateException("No field with name " + fieldName + " found");
        }
        if (!Modifier.isPrivate(foundField.access) || Modifier.isStatic(foundField.access)) {
            throw new IllegalStateException("Field " + fieldName + " is not private and an instance field");
        }

        final String methodSignature = "()" + foundField.desc;

        for (MethodNode methodNode : classNode.methods) {
            if (Objects.equals(methodNode.desc, methodSignature)) {
                if (foundMethod == null && Objects.equals(methodNode.name, methodName)) {
                    foundMethod = methodNode;
                } else if (foundMethod == null && methodName == null) {
                    foundMethod = methodNode;
                } else if (foundMethod != null && (methodName == null || Objects.equals(methodNode.name, methodName))) {
                    throw new IllegalStateException("Found duplicate method with signature " + methodSignature);
                }
            }
        }

        if (foundMethod == null) {
            throw new IllegalStateException("Unable to find method " + methodSignature);
        }

        for (MethodNode methodNode : classNode.methods) {
            // skip the found getter method
            if (methodNode == foundMethod) continue;

            if (Objects.equals(methodNode.desc, methodSignature)) continue;

            final ListIterator<AbstractInsnNode> iterator = methodNode.instructions.iterator();
            while (iterator.hasNext()) {
                AbstractInsnNode insnNode = iterator.next();
                if (insnNode.getOpcode() == Opcodes.GETFIELD) {
                    FieldInsnNode fieldInsnNode = (FieldInsnNode) insnNode;
                    if (Objects.equals(fieldInsnNode.name, fieldName)) {
                        iterator.remove();
                        MethodInsnNode replace = new MethodInsnNode(Opcodes.INVOKEVIRTUAL, classNode.name, foundMethod.name, foundMethod.desc, false);
                        iterator.add(replace);
                    }
                }
            }
        }
    }


    /* SRG NAME REMAPPING */

    /**
     * Maps a method from the given SRG name to the mapped name at deobfuscated runtime.
     *
     * @param name The SRG name of the method
     * @return The mapped name of the method
     *
     * @apiNote As of Minecraft 1.20.4, Forge no longer uses SRG names in production. While the mapping system will
     *     still work for sake of backwards-compatibility, you should not be using this method if you are on 1.20.4 or
     *     later.
     */
    public static String mapMethod(String name) {
        return map(name, INameMappingService.Domain.METHOD);
    }

    /**
     * Maps a field from the given SRG name to the mapped name at deobfuscated runtime.
     *
     * @param name The SRG name of the field
     * @return The mapped name of the field
     *
     * @apiNote As of Minecraft 1.20.4, Forge no longer uses SRG names in production. While the mapping system will
     *     still work for sake of backwards-compatibility, you should not be using this method if you are on 1.20.4 or
     *     later.
     */
    public static String mapField(String name) {
        return map(name, INameMappingService.Domain.FIELD);
    }

    private static String map(String name, INameMappingService.Domain domain) {
        return Optional.ofNullable(Launcher.INSTANCE).
                   map(Launcher::environment).
                   flatMap(env -> env.findNameMapping("srg")).
                   map(f -> f.apply(domain, name)).orElse(name);
    }


    /* ADDITIONAL DATA */

    /**
     * Checks if the given JVM property (or if the property prepended with {@code "coremod."}) is {@code true}.
     *
     * @param propertyName the property to check
     * @return true if the property is {@code true}
     */
    public static boolean getSystemPropertyFlag(final String propertyName) {
        // TODO: Remove all backwards-compatible logic in 6.0
        return Boolean.getBoolean(propertyName) // actually checks the flag
                   || Boolean.getBoolean("coremod." + propertyName) // the original intended purpose
                   || Boolean.getBoolean(System.getProperty("coremod." + propertyName, "TRUE")); // the bugged logic for backwards-compatibility
    }

    /**
     * Loads a JavaScript file by file name. Useful for reusing code across multiple files.
     *
     * @param file The file name to load
     * @return {@code true} if the file load was successful. The file will only be loaded in the
     *     {@code initializeCoreMod()} or any of the transformer functions returned by it.
     *
     * @throws ScriptException If the script engine encounters an error, usually due to a syntax error in the script
     * @throws IOException     If an I/O error occurs while reading the file, usually due to a corrupt or missing file
     */
    public static boolean loadFile(String file) throws ScriptException, IOException {
        return CoreModTracker.loadFileByName(file);
    }

    /**
     * Loads JSON data from a file by file name.
     *
     * @param file The file name to load
     * @return The loaded JSON data if successful, or {@code null} if not. The data will only be loaded in the
     *     {@code initializeCoreMod()} or any of the transformer functions returned by it.
     *
     * @throws ScriptException If the parsed JSON data is malformed
     * @throws IOException     If an I/O error occurs while reading the file, usually due to a corrupt or missing file
     */
    @Nullable
    public static Object loadData(String file) throws ScriptException, IOException {
        return CoreModTracker.loadDataByName(file);
    }


    /* LOGGING AND DEBUGGING */

    /**
     * Logs the given message at the given level. The message can contain formatting arguments. Uses a
     * {@link org.apache.logging.log4j.Logger}.
     *
     * @param level   The log level
     * @param message The message
     * @param args    Any formatting arguments
     * @see CoreModTracker#log(String, String, Object[])
     */
    public static void log(String level, String message, Object... args) {
        CoreModTracker.log(level, message, args);
    }

    /**
     * Converts a {@link ClassNode} to a string representation. Useful for evaluating changes after transformation.
     *
     * @param node The class node to convert
     * @return The string representation of the class node
     */
    public static String classNodeToString(ClassNode node) {
        Textifier text = new Textifier();
        node.accept(new TraceClassVisitor(null, text, null));
        return toString(text);
    }

    /**
     * Converts a {@link MethodNode} to a string representation. Useful for evaluating changes after transformation.
     *
     * @param node The method node to convert
     * @return The string representation of the method node
     */
    public static String methodNodeToString(MethodNode node) {
        Textifier text = new Textifier();
        node.accept(new TraceMethodVisitor(text));
        return toString(text);
    }

    /**
     * Converts a {@link FieldNode} to a string representation. Useful for evaluating changes after transformation.
     *
     * @param node The field node to convert
     * @return The string representation of the field node
     */
    public static String fieldNodeToString(FieldNode node) {
        Textifier text = new Textifier();
        node.accept(new TraceClassVisitor(null, text, null));
        return toString(text);
    }

    /**
     * Converts an {@link InsnList} to a string representation, displaying each instruction in the list similar to
     * {@link #insnToString(AbstractInsnNode)}.
     *
     * @param list The list to convert
     * @return The string representation of the instruction list
     */
    public static String insnListToString(InsnList list) {
        Textifier text = new Textifier();
        list.accept(new TraceMethodVisitor(text));
        return toString(text);
    }

    /**
     * Converts an {@link AbstractInsnNode} to a string representation.
     *
     * @param insn The instruction to convert
     * @return The string representation of the instruction
     */
    public static String insnToString(AbstractInsnNode insn) {
        Textifier text = new Textifier();
        insn.accept(new TraceMethodVisitor(text));
        return toString(text);
    }

    /**
     * Gets the LDC constant's class name as a string. Useful for debugging existing LDC instructions.
     *
     * @param insn The LDC instruction
     * @return The class name of the LDC constant
     */
    public static String ldcInsnClassToString(LdcInsnNode insn) {
        return insn.cst.getClass().toString();
    }

    private static String toString(Textifier text) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        text.print(pw);
        pw.flush();
        return sw.toString();
    }
}
