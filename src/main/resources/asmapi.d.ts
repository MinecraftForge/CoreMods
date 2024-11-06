import MethodType = ASMAPI.MethodType;
import InsertMode = ASMAPI.InsertMode;

type MethodNode = any
type MethodInsnNode = any
type AbstractInsnNode = any
type ClassNode = any
type FieldNode = any
type InsnList = any




declare interface ASMAPI {
    
    /**
     * Helper to construct a new empty MethodNode.
     */
    getMethodNode(): MethodNode
    
    /**
     * Add a MethodInsnNode to the beginning of the target MethodNode's instructions list.
     * @param node
     * @param methodCall
     */
    appendMethodCall(node: MethodNode, methodCall: MethodInsnNode): void
    
    
    
    
    /**
     * Helper to build a MethodInsnNode.
     * @param ownerName The name of the owner, from bytecode.
     * @param methodName The method name, from bytecode.
     * @param methodDescriptor The method descriptor, from bytecode.
     * @param type The type of the method to be invoked.
     */
    buildMethodCall(ownerName: String, methodName: String, methodDescriptor: String, type: MethodType): MethodInsnNode
    
    /**
     * Convert a method name from SRG to deobfuscated.
     * @param name The SRG name of a method.
     */
    mapMethod(name: String): String
    
    /**
     * Convert a field name from SRG to deobfuscated.
     * @param name The SRG name of a field.
     */
    mapField(name: String): String
    
    /**
     * Checks if the given JVM property (or if the property prepended with {@code "coremod."}) is {@code true}.
     *
     * @param propertyName the property to check
     * @return true if the property is true
     */
    getSystemPropertyFlag(propertyName: String): boolean
    
    
    
    /**
     * Finds the first instruction with matching opcode
     *
     * @param method the method to search in
     * @param opCode the opcode to search for
     * @return the found instruction node or null if none matched
     */
    findFirstInstruction(method: MethodNode, opCode: number): AbstractInsnNode
    
    /**
     * Finds the first instruction with matching opcode after the given start index
     *
     * @param method the method to search in
     * @param opCode the opcode to search for
     * @param startIndex the index to start search after (inclusive)
     * @return the found instruction node or null if none matched after the given index
     */
    findFirstInstructionAfter(method: MethodNode, opCode: number, startIndex: number): AbstractInsnNode ;
    
    /**
     * Finds the first instruction with matching opcode before the given index in reverse search
     *
     * @param method the method to search in
     * @param opCode the opcode to search for
     * @param startIndex the index at which to start searching (inclusive)
     * @return the found instruction node or null if none matched before the given startIndex
     */
    findFirstInstructionBefore(method: MethodNode, opCode: number, startIndex: number): AbstractInsnNode;
    
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
    findFirstMethodCall(method: MethodNode, type: MethodType, owner: String, name: String, descriptor: String): MethodInsnNode
    
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
    findFirstMethodCallAfter(method: MethodNode, type: MethodType, owner: String, name: String, descriptor: String, startIndex: number): MethodInsnNode;
    
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
    findFirstMethodCallBefore(method: MethodNode, type: MethodType, owner: String, name: String, descriptor: String, startIndex: number): MethodInsnNode;
    
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
    insertInsnList(method: MethodNode, type: MethodType, owner: String, name: String, desc: String, list: InsnList, mode: InsertMode): boolean;
    
    /**
     * Builds a new {@link InsnList} out of the specified AbstractInsnNodes
     * @param nodes The nodes you want to add
     * @return A new list with the nodes
     */
    listOf(...nodes: AbstractInsnNode): InsnList
    
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
    redirectFieldToMethod(classNode: ClassNode, fieldName: String, methodName: String): void
    
    loadFile(file: String): boolean
    
    /**
     * Load a JSON file as an object.
     * @param file Path to the file, from the resources directory/root of the jar.
     */
    loadData<T>(file: String): T
    
    log(level: String, message: String, ...args: any): void
    
    classNodeToString(node: ClassNode): String
    
    fieldNodeToString(node: FieldNode): String
    
    methodNodeToString(node: MethodNode): String
}

declare namespace ASMAPI {
    namespace MethodType {
        const VIRTUAL: MethodType
        const SPECIAL: MethodType
        const STATIC: MethodType
        const INTERFACE: MethodType
        const DYNAMIC: MethodType
    }
    
    interface MethodType {
        toOpcode(): number;
    }
    
    enum InsertMode {
        REMOVE_ORIGINAL,
        INSERT_BEFORE,
        INSERT_AFTER
    }
}

declare interface Java {
    type(name: 'net.minecraftforge.coremod.api.ASMAPI'): ASMAPI
}
