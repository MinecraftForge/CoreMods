///<reference path="asmapi.d.ts"/>

/**
 * org.objectweb.asm.tree.ClassNode
 */
type ClassNode = any;

/**
 * org.objectweb.asm.tree.MethodNode
 */
type MethodNode = any;

/**
 * org.objectweb.asm.tree.FieldNode
 */
type FieldNode = any;


declare interface MultiClassTarget {
    "type": "CLASS"
    
    /**
     * A function returning a list of class names to target.
     * @param self This object.
     */
    "names": (self: MultiClassTarget) => string[]
}

declare interface SingleClassTarget {
    "type": "CLASS"
    
    /**
     * String representing the class name to target.
     * String must contain the fully qualified name of the class. (e.g. "net.minecraft.world.level.Block")
     */
    "name": string
}

declare interface ClassTransformer {
    /**
     * The target discriminator.
     */
    "target": SingleClassTarget | MultiClassTarget,
    /**
     * Function to transform the class. Must return its input.
     * ClassNode: org.objectweb.asm.tree.ClassNode.
     */
    "transformer": ((classNode: ClassNode) => ClassNode)
}

declare interface MethodTransformer {
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

declare interface FieldTransformer {
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
     * Function to transform the field. Must return the input.
     */
    "transformer": ((fieldNode: FieldNode) => FieldNode)
}

/**
 * Contains the declared transformers for this file, in the form "{ 'TransformerName': <transformer> }"
 */
declare interface CoreModInitializer {
    [transformerName: string]: ClassTransformer | MethodTransformer | FieldTransformer
}

/**
 * Entry point to the coremod script.
 */
declare function initializeCoreMod(): CoreModInitializer;
