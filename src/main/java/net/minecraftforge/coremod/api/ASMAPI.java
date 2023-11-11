/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod.api;

import cpw.mods.modlauncher.Launcher;
import cpw.mods.modlauncher.api.INameMappingService;
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
import java.util.Iterator;
import java.util.ListIterator;
import java.util.Objects;
import java.util.Optional;

public class ASMAPI {
    public static MethodNode getMethodNode() {
        return new MethodNode(Opcodes.ASM6);
    }

    public static void appendMethodCall(MethodNode node, MethodInsnNode methodCall) {
        node.instructions.insertBefore(node.instructions.getFirst(), methodCall);
    }

    public enum MethodType {
        VIRTUAL, SPECIAL, STATIC, INTERFACE;

        public int toOpcode() {
            return Opcodes.INVOKEVIRTUAL + this.ordinal();
        }
    }

    public static MethodInsnNode buildMethodCall(final String ownerName, final String methodName, final String methodDescriptor, final MethodType type) {
        return new MethodInsnNode(type.toOpcode(), ownerName, methodName, methodDescriptor, type==MethodType.INTERFACE);
    }

    public static String mapMethod(String name) {
        return map(name, INameMappingService.Domain.METHOD);
    }

    public static String mapField(String name) {
        return map(name, INameMappingService.Domain.FIELD);
    }

    private static String map(String name, INameMappingService.Domain domain) {
        return Optional.ofNullable(Launcher.INSTANCE).
                map(Launcher::environment).
                flatMap(env->env.findNameMapping("srg")).
                map(f -> f.apply(domain, name)).orElse(name);
    }

    public static boolean getSystemPropertyFlag(final String propertyName) {
        return Boolean.getBoolean("coremod." + propertyName) || getSystemPropertyFlagOld(propertyName);
    }

    /** @deprecated Contains the old, bugged logic that {@link #getSystemPropertyFlag(String)} used to have. */
    @Deprecated(forRemoval = true, since = "5.0")
    private static boolean getSystemPropertyFlagOld(final String propertyName) {
        return Boolean.getBoolean(System.getProperty("coremod." + propertyName, "TRUE"));
    }

    public enum InsertMode {
        REMOVE_ORIGINAL, INSERT_BEFORE, INSERT_AFTER
    }

    /**
     * Finds the first instruction with matching opcode
     *
     * @param method the method to search in
     * @param opCode the opcode to search for
     * @return the found instruction node or null if none matched
     */
    public static AbstractInsnNode findFirstInstruction(MethodNode method, int opCode) {
        return findFirstInstructionAfter(method, opCode, 0);
    }

    /**
     * Finds the first instruction with matching opcode after the given start index
     *
     * @param method the method to search in
     * @param opCode the opcode to search for
     * @param startIndex the index to start search after (inclusive)
     * @return the found instruction node or null if none matched after the given index
     */
    public static AbstractInsnNode findFirstInstructionAfter(MethodNode method, int opCode, int startIndex) {
        for (int i = Math.max(0, startIndex); i < method.instructions.size(); i++) {
            AbstractInsnNode ain = method.instructions.get(i);
            if (ain.getOpcode() == opCode) {
                return ain;
            }
        }
        return null;
    }

    /**
     * Finds the first instruction with matching opcode before the given index in reverse search
     *
     * @param method the method to search in
     * @param opCode the opcode to search for
     * @param startIndex the index at which to start searching (inclusive)
     * @return the found instruction node or null if none matched before the given startIndex
     */
    public static AbstractInsnNode findFirstInstructionBefore(MethodNode method, int opCode, int startIndex) {
        for (int i = Math.max(method.instructions.size() - 1, startIndex); i >= 0; i--) {
            AbstractInsnNode ain = method.instructions.get(i);
            if (ain.getOpcode() == opCode) {
                return ain;
            }
        }
        return null;
    }

    /**
     * Finds the first method call in the given method matching the given type, owner, name and descriptor
     *
     * @param method the method to search in
     * @param type the type of method call to search for
     * @param owner the method call's owner to search for
     * @param name the method call's name
     * @param descriptor the method call's descriptor
     * @return the found method call node or null if none matched
     */
    public static MethodInsnNode findFirstMethodCall(MethodNode method, MethodType type, String owner, String name, String descriptor) {
        return findFirstMethodCallAfter(method, type, owner, name, descriptor, 0);
    }

    /**
     * Finds the first method call in the given method matching the given type, owner, name and descriptor
     * after the instruction given index
     *
     * @param method the method to search in
     * @param type the type of method call to search for
     * @param owner the method call's owner to search for
     * @param name the method call's name
     * @param descriptor the method call's descriptor
     * @param startIndex the index after which to start searching (inclusive)
     * @return the found method call node, null if none matched after the given index
     */
    public static MethodInsnNode findFirstMethodCallAfter(MethodNode method, MethodType type, String owner, String name, String descriptor, int startIndex) {
        for (int i = Math.max(0, startIndex); i < method.instructions.size(); i++) {
            AbstractInsnNode node = method.instructions.get(i);
            if (node instanceof MethodInsnNode &&
                    node.getOpcode() == type.toOpcode()) {
                MethodInsnNode methodInsnNode = (MethodInsnNode) node;
                if (methodInsnNode.owner.equals(owner) &&
                        methodInsnNode.name.equals(name) &&
                        methodInsnNode.desc.equals(descriptor)) {
                    return methodInsnNode;
                }
            }
        }
        return null;
    }

    /**
     * Finds the first method call in the given method matching the given type, owner, name and descriptor
     * before the given index in reverse search
     *
     * @param method the method to search in
     * @param type the type of method call to search for
     * @param owner the method call's owner to search for
     * @param name the method call's name
     * @param descriptor the method call's descriptor
     * @param startIndex the index at which to start searching (inclusive)
     * @return the found method call node or null if none matched before the given startIndex
     */
    public static MethodInsnNode findFirstMethodCallBefore(MethodNode method, MethodType type, String owner, String name, String descriptor, int startIndex) {
        for (int i = Math.min(method.instructions.size() - 1, startIndex); i >= 0; i--) {
            AbstractInsnNode node = method.instructions.get(i);
            if (node instanceof MethodInsnNode &&
                    node.getOpcode() == type.toOpcode()) {
                MethodInsnNode methodInsnNode = (MethodInsnNode) node;
                if (methodInsnNode.owner.equals(owner) &&
                        methodInsnNode.name.equals(name) &&
                        methodInsnNode.desc.equals(descriptor)) {
                    return methodInsnNode;
                }
            }
        }
        return null;
    }

    /**
     * Inserts/replaces a list after/before first {@link MethodInsnNode} that matches the parameters of these functions in the method provided.
     * Only the first node matching is targeted, all other matches are ignored.
     * @param method The method where you want to find the node
     * @param type The type of the old method node.
     * @param owner The owner of the old method node.
     * @param name The name of the old method node. You may want to use {@link #mapMethod(String)} if this is a srg name
     * @param desc The desc of the old method node.
     * @param list The list that should be inserted
     * @param mode How the given code should be inserted
     * @return True if the node was found, false otherwise
     */
    public static boolean insertInsnList(MethodNode method, MethodType type, String owner, String name, String desc, InsnList list, InsertMode mode) {
        Iterator<AbstractInsnNode> nodeIterator = method.instructions.iterator();
        int opcode = type.toOpcode();
        while (nodeIterator.hasNext()) {
            AbstractInsnNode next = nodeIterator.next();
            if (next.getOpcode() == opcode) {
                MethodInsnNode castedNode = (MethodInsnNode) next;
                if (castedNode.owner.equals(owner) && castedNode.name.equals(name) && castedNode.desc.equals(desc)) {
                    if (mode == InsertMode.INSERT_BEFORE)
                        method.instructions.insertBefore(next, list);
                    else
                        method.instructions.insert(next, list);

                    if (mode == InsertMode.REMOVE_ORIGINAL)
                        nodeIterator.remove();
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Builds a new {@link InsnList} out of the specified AbstractInsnNodes
     * @param nodes The nodes you want to add
     * @return A new list with the nodes
     */
    public static InsnList listOf(AbstractInsnNode... nodes) {
        InsnList list = new InsnList();
        for (AbstractInsnNode node : nodes)
            list.add(node);
        return list;
    }

    /**
     * Rewrites accesses to a specific field in the given class to a method-call.
     *
     * The field specified by fieldName must be private and non-static.
     * The method-call the field-access is redirected to does not take any parameters and returns an object of the
     * same type as the field.
     * If no methodName is passed, any method matching the described signature will be used as callable method.
     *
     * @param classNode the class to rewrite the accesses in
     * @param fieldName the field accesses should be redirected to
     * @param methodName the name of the method to redirect accesses through,
     *                   or null if any method with matching signature should be applicable
     */
    public static void redirectFieldToMethod(final ClassNode classNode, final String fieldName, @Nullable final String methodName) {
        MethodNode foundMethod = null;
        FieldNode foundField = null;
        for (FieldNode fieldNode : classNode.fields) {
            if (Objects.equals(fieldNode.name, fieldName)) {
                if (foundField == null) {
                    foundField = fieldNode;
                } else {
                    throw new IllegalStateException("Found multiple fields with name "+fieldName);
                }
            }
        }

        if (foundField == null) {
            throw new IllegalStateException("No field with name "+fieldName+" found");
        }
        if (!Modifier.isPrivate(foundField.access) || Modifier.isStatic(foundField.access)) {
            throw new IllegalStateException("Field "+fieldName+" is not private and an instance field");
        }

        final String methodSignature = "()"+foundField.desc;

        for (MethodNode methodNode : classNode.methods) {
            if (Objects.equals(methodNode.desc, methodSignature)) {
                if (foundMethod == null && Objects.equals(methodNode.name, methodName)) {
                    foundMethod = methodNode;
                } else if (foundMethod == null && methodName == null) {
                    foundMethod = methodNode;
                } else if (foundMethod != null && (methodName == null || Objects.equals(methodNode.name, methodName))) {
                    throw new IllegalStateException("Found duplicate method with signature "+methodSignature);
                }
            }
        }

        if (foundMethod == null) {
            throw new IllegalStateException("Unable to find method "+methodSignature);
        }

        for (MethodNode methodNode : classNode.methods) {
            // skip the found getter method
            if (methodNode == foundMethod) continue;
            if (!Objects.equals(methodNode.desc, methodSignature)) {
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
    }

    public static boolean loadFile(String file) throws ScriptException, IOException {
        return CoreModTracker.loadFileByName(file);
    }

    @Nullable
    public static Object loadData(String file) throws ScriptException, IOException {
        return CoreModTracker.loadDataByName(file);
    }

    public static void log(String level, String message, Object... args) {
        CoreModTracker.log(level, message, args);
    }

    public static String classNodeToString(ClassNode node) {
        Textifier text = new Textifier();
        node.accept(new TraceClassVisitor(null, text, null));
        return toString(text);
    }

    public static String fieldNodeToString(FieldNode node) {
        Textifier text = new Textifier();
        node.accept(new TraceClassVisitor(null, text, null));
        return toString(text);
    }

    public static String methodNodeToString(MethodNode node) {
        Textifier text = new Textifier();
        node.accept(new TraceMethodVisitor(text));
        return toString(text);
    }

    private static String toString(Textifier text) {
        StringWriter sw = new StringWriter();
        PrintWriter pw = new PrintWriter(sw);
        text.print(pw);
        pw.flush();
        return sw.toString();
    }
}
