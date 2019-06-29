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
     * Inserts/replaces a list after/before first {@link MethodInsnNode} that matches the parameters of these functions in the method provided.
     * @param method The method where you want to find the node
     * @param type The type of the old method node.
     * @param owner The owner of the old method node.
     * @param name The name of the old method node. You may want to use {@link #mapMethod(String)} if this is a srg name
     * @param desc The desc of the old method node.
     * @param list The list that should be inserted
     * @param targetAll If true, all node that match the 3 params are targeted. Otherwise, only the first one is chosen.
     * @param mode How the given code should be inserted
     * @return The count of the replacements made
     */
    public static int insertInsnList(MethodNode method, MethodType type, String owner, String name, String desc, InsnList list, boolean targetAll, InsertMode mode) {
        Iterator<AbstractInsnNode> nodeIterator = method.instructions.iterator();
        int opcode = type.toOpcode();
        int counter = 0;
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
                    counter++;
                    if (!targetAll) break;
                }
            }
        }
        return counter;
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
