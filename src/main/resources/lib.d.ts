/**
 * org.objectweb.asm.tree.ClassNode
 */
export type ClassNode = any;

/**
 * org.objectweb.asm.tree.MethodNode
 */
export type MethodNode = any;

/**
 * org.objectweb.asm.tree.FieldNode
 */
export type FieldNode = any;


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
