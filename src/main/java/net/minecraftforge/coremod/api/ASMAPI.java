package net.minecraftforge.coremod.api;

import org.objectweb.asm.Opcodes;
import org.objectweb.asm.tree.*;

public class ASMAPI {
    public static MethodNode getMethodNode() {
        return new MethodNode(Opcodes.ASM6);
    }

    public static void appendMethodCall(MethodNode node, MethodInsnNode methodCall) {
        node.instructions.insertBefore(node.instructions.getFirst(), methodCall);
    }

    public enum MethodType {
        VIRTUAL, SPECIAL, STATIC, INTERFACE
    }

    public static MethodInsnNode buildMethodCall(final String ownerName, final String methodName, final String methodDescriptor, final MethodType type) {
        return new MethodInsnNode(type.ordinal()+Opcodes.INVOKEVIRTUAL, ownerName, methodName, methodDescriptor, type==MethodType.INTERFACE);
    }
}
