///<reference path="asm.d.ts" />

declare namespace Java {
    export function type(s: 'org.objectweb.asm.tree.AbstractInsnNode'): org.objectweb.asm.tree.AbstractInsnNode
    export function type(s: 'org.objectweb.asm.tree.FieldInsnNode'): org.objectweb.asm.tree.FieldInsnNode
    export function type(s: 'org.objectweb.asm.tree.FrameNode'): org.objectweb.asm.tree.FrameNode
    export function type(s: 'org.objectweb.asm.tree.IincInsnNode'): org.objectweb.asm.tree.IincInsnNode
    export function type(s: 'org.objectweb.asm.tree.InsnNode'): org.objectweb.asm.tree.InsnNode
    export function type(s: 'org.objectweb.asm.tree.IntInsnNode'): org.objectweb.asm.tree.IntInsnNode
    export function type(s: 'org.objectweb.asm.tree.InsnList'): org.objectweb.asm.tree.InsnList
    export function type(s: 'org.objectweb.asm.tree.InvokeDynamicInsnNode'): org.objectweb.asm.tree.InvokeDynamicInsnNode
    export function type(s: 'org.objectweb.asm.tree.JumpInsnNode'): org.objectweb.asm.tree.JumpInsnNode
    export function type(s: 'org.objectweb.asm.tree.LabelNode'): org.objectweb.asm.tree.LabelNode
    export function type(s: 'org.objectweb.asm.tree.LdcInsnNode'): org.objectweb.asm.tree.LdcInsnNode
    export function type(s: 'org.objectweb.asm.tree.LineNumberNode'): org.objectweb.asm.tree.LineNumberNode
    export function type(s: 'org.objectweb.asm.tree.LocalVariableAnnotationNode'): org.objectweb.asm.tree.LocalVariableAnnotationNode
    export function type(s: 'org.objectweb.asm.tree.LocalVariableNode'): org.objectweb.asm.tree.LocalVariableNode
    export function type(s: 'org.objectweb.asm.tree.LookupSwitchInsnNode'): org.objectweb.asm.tree.LookupSwitchInsnNode
    export function type(s: 'org.objectweb.asm.tree.MethodInsnNode'): org.objectweb.asm.tree.MethodInsnNode
    export function type(s: 'org.objectweb.asm.tree.MultiANewArrayInsnNode'): org.objectweb.asm.tree.MultiANewArrayInsnNode
    export function type(s: 'org.objectweb.asm.tree.TableSwitchInsnNode'): org.objectweb.asm.tree.TableSwitchInsnNode
    export function type(s: 'org.objectweb.asm.tree.TryCatchBlockNode'): org.objectweb.asm.tree.TryCatchBlockNode
    export function type(s: 'org.objectweb.asm.tree.TypeAnnotationNode'): org.objectweb.asm.tree.TypeAnnotationNode
    export function type(s: 'org.objectweb.asm.tree.TypeInsnNode'): org.objectweb.asm.tree.TypeInsnNode
    export function type(s: 'org.objectweb.asm.tree.VarInsnNode'): org.objectweb.asm.tree.VarInsnNode
    
    export function type(s: 'org.objectweb.asm.tree.FieldNode'): org.objectweb.asm.tree.FieldNode
    
    export function type(s: 'org.objectweb.asm.tree.MethodNode'): org.objectweb.asm.tree.MethodNode
    export function type(s: 'org.objectweb.asm.tree.ParameterNode'): org.objectweb.asm.tree.ParameterNode
    
    export function type(s: 'org.objectweb.asm.Attribute'): org.objectweb.asm.Attribute
    export function type(s: 'org.objectweb.asm.Handle'): org.objectweb.asm.Handle
    export function type(s: 'org.objectweb.asm.Label'): org.objectweb.asm.Label
    export function type(s: 'org.objectweb.asm.Type'): org.objectweb.asm.Type
    export function type(s: 'org.objectweb.asm.TypePath'): org.objectweb.asm.TypePath
    export function type(s: 'org.objectweb.asm.TypeReference'): org.objectweb.asm.TypeReference
    
    export function type(s: 'org.objectweb.asm.util.ASMifier'): org.objectweb.asm.util.ASMifier
    export function type(s: 'org.objectweb.asm.util.ASMifierSupport'): org.objectweb.asm.util.ASMifierSupport
    export function type(s: 'org.objectweb.asm.util.CheckAnnotationAdapter'): org.objectweb.asm.util.CheckAnnotationAdapter
    export function type(s: 'org.objectweb.asm.util.CheckClassAdapter'): org.objectweb.asm.util.CheckClassAdapter
    export function type(s: 'org.objectweb.asm.util.CheckFieldAdapter'): org.objectweb.asm.util.CheckFieldAdapter
    export function type(s: 'org.objectweb.asm.util.CheckMethodAdapter'): org.objectweb.asm.util.CheckMethodAdapter
    export function type(s: 'org.objectweb.asm.util.CheckModuleAdapter'): org.objectweb.asm.util.CheckModuleAdapter
    export function type(s: 'org.objectweb.asm.util.CheckRecordComponentAdapter'): org.objectweb.asm.util.CheckRecordComponentAdapter
    export function type(s: 'org.objectweb.asm.util.CheckSignatureAdapter'): org.objectweb.asm.util.CheckSignatureAdapter
    export function type(s: 'org.objectweb.asm.util.Printer'): org.objectweb.asm.util.Printer
    export function type(s: 'org.objectweb.asm.util.Textifier'): org.objectweb.asm.util.Textifier
    export function type(s: 'org.objectweb.asm.util.TextifierSupport'): org.objectweb.asm.util.TextifierSupport
    export function type(s: 'org.objectweb.asm.util.TraceAnnotationVisitor'): org.objectweb.asm.util.TraceAnnotationVisitor
    export function type(s: 'org.objectweb.asm.util.TraceClassVisitor'): org.objectweb.asm.util.TraceClassVisitor
    export function type(s: 'org.objectweb.asm.util.TraceFieldVisitor'): org.objectweb.asm.util.TraceFieldVisitor
    export function type(s: 'org.objectweb.asm.util.TraceMethodVisitor'): org.objectweb.asm.util.TraceMethodVisitor
    export function type(s: 'org.objectweb.asm.util.TraceModuleVisitor'): org.objectweb.asm.util.TraceModuleVisitor
    export function type(s: 'org.objectweb.asm.util.TraceSignatureVisitor'): org.objectweb.asm.util.TraceSignatureVisitor
}

/**
 * org.objectweb.asm.tree.ClassNode
 */
export type ClassNode = org.objectweb.asm.tree.ClassNode;

/**
 * org.objectweb.asm.tree.MethodNode
 */
export type MethodNode = org.objectweb.asm.tree.MethodNode;

/**
 * org.objectweb.asm.tree.FieldNode
 */
export type FieldNode = org.objectweb.asm.tree.FieldNode;


export interface ClassTarget {
    "type": "CLASS"
    
    /**
     * String representing the class name to target.
     * Strings must contain the fully qualified name of the class. (e.g. "net.minecraft.world.level.Block")
     * Either "name" or "names" MUST be present!
     */
    "name"?: string
    
    /**
     * A function returning a list of class names to target.
     * Either "name" or "names" MUST be present!
     * @param self This ClassTarget.
     */
    "names"?: (self: ClassTarget) => string[]
}

export interface ClassTransformer {
    /**
     * The target discriminator.
     */
    "target": ClassTarget,
    /**
     * Function to transform the class. Must return its input.
     * ClassNode: org.objectweb.asm.tree.ClassNode.
     */
    "transformer": ((classNode: ClassNode) => ClassNode)
}

export interface MethodTransformer {
    /**
     * The target discriminator.
     */
    "target": {
        "type": "METHOD",
        /**
         * The fully qualified name of the target class. (e.g. "net.minecraft.world.level.Block")
         */
        "class": string,
        
        /**
         * The SRG name of the target method, if obfuscated. (e.g. Block.byName -> m_49814_)
         * (Will be remapped by FML using ASMAPI.mapMethod when evaluated.)
         *
         * If the target is NOT an obfuscated class or inherited method, then this should be the normal method name.
         */
        "methodName": string,
        
        /**
         * The target method's descriptor/signature. [e.g. "(Lnet/minecraft/world/item/Item;)Lnet/minecraft/world/level/block/Block;"]
         */
        "methodDesc": string
    },
    /**
     * Function to transform the method. Must return the input.
     * MethodNode: org.objectweb.asm.tree.MethodNode.
     */
    "transformer": ((methodNode: MethodNode) => MethodNode)
}

export interface FieldTransformer {
    /**
     * The target discriminator.
     */
    "target": {
        "type": "METHOD",
        /**
         * The fully qualified name of the target class. (e.g. "net.minecraft.world.level.Block")
         */
        "class": string,
        
        /**
         * The SRG name of the target field, if obfuscated. (e.g. Block#descriptionId -> f_49787_)
         *
         * If the target is NOT an obfuscated class or inherited field, then this should be the normal field name.
         */
        "fieldName": string,
    },
    /**
     * Function to transform the method. Must return the input.
     * MethodNode: org.objectweb.asm.tree.MethodNode.
     */
    "transformer": ((fieldNode: FieldNode) => FieldNode)
}

/**
 * Contains the declared transformers for this file, in the form "{ 'TransformerName': <transformer> }"
 */
export interface CoreModInitializer {
    [transformerName: string]: ClassTransformer | MethodTransformer | FieldTransformer
}

declare global {
    function initializeCoreMod(): CoreModInitializer;
}
