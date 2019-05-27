package net.minecraftforge.coremod.api;

import cpw.mods.modlauncher.Launcher;
import cpw.mods.modlauncher.api.INameMappingService;
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

    public static String mapMethod(String name) {
        return map(name, INameMappingService.Domain.METHOD);
    }

    public static String mapField(String name) {
        return map(name, INameMappingService.Domain.FIELD);
    }

    private static String map(String name, INameMappingService.Domain domain) {
        return Launcher.INSTANCE.environment().findNameMapping("srg").map(f -> f.apply(domain, name)).orElse(name);
    }

    public static boolean getSystemPropertyFlag(final String propertyName) {
        return Boolean.getBoolean(System.getProperty("coremod."+propertyName, "TRUE"));
    }
}
