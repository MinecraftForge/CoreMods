package net.minecraftforge.coremod.api;

import cpw.mods.modlauncher.Launcher;
import cpw.mods.modlauncher.api.INameMappingService;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.tree.*;

import java.util.Iterator;
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
        return Boolean.getBoolean(System.getProperty("coremod."+propertyName, "TRUE"));
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
        for (int i = Math.max(method.instructions.size() - 1, startIndex); i >= 0; i--) {
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
}
