declare interface _AbstractInsnNode {
    opcode: number
}

declare interface _LdcInsnNode extends AbstractInsnNode {
    new(constant: any)
    cst: any
}

declare interface _VarInsnNode extends AbstractInsnNode {
    new(opcode: number, varIdx: number)
    "var": number
}

declare interface _InsnNode extends AbstractInsnNode {
    new(opcode: number)
}

declare interface _MethodInsnNode extends AbstractInsnNode {
    new(opcode: number, owner: string, name: string, descriptor: string, isInterface?: boolean)
    owner: string,
    name: string,
    desc: string,
    itf: boolean
}

declare interface _TypeInsnNode extends AbstractInsnNode {
    new(opcode: number, type: string)
    desc: string
}

declare interface _InsnList {
    new()
    
    get(i: number): AbstractInsnNode
    
    add(insn: AbstractInsnNode | _InsnList)
    
    remove(insn: AbstractInsnNode)
    
    removeAll(mark: boolean)
    
    getFirst(): AbstractInsnNode
    
    getLast(): AbstractInsnNode
    
    size(): number
    
    clear(): void
    
    resetLabels(): void
    
    contains(node: AbstractInsnNode): boolean
    
    indexOf(insnNode: AbstractInsnNode): number
    
    toArray(): AbstractInsnNode[]
    
    set(oldInsnNode: AbstractInsnNode, newInsnNode: AbstractInsnNode): void
    
    insert(insnNode: AbstractInsnNode, otherNode?: AbstractInsnNode | _InsnList): void
    
    insertBefore(insnNode: AbstractInsnNode, otherNode: AbstractInsnNode | _InsnList): void
    
    
}

declare interface _Opcodes {
    ASM4: number
    ASM5: number
    ASM6: number
    ASM7: number
    ASM8: number
    ASM9: number
    
   
   
    SOURCE_DEPRECATED: number
    SOURCE_MASK: number
    
    // Java ClassFile versions (the minor version is stored in the 16 most significant bits, and the
    // major version in the 16 least significant bits).
    
    V1_1: number
    V1_2: number
    V1_3: number
    V1_4: number
    V1_5: number
    V1_6: number
    V1_7: number
    V1_8: number
    V9: number
    V10: number
    V11: number
    V12: number
    V13: number
    V14: number
    V15: number
    V16: number
    V17: number
    V18: number
    V19: number
    V20: number
    V21: number
    V22: number
    V23: number
    
    /**
     * Version flag indicating that the class is using 'preview' features.
     *
     * <p>{@code version & V_PREVIEW == V_PREVIEW} tests if a version is flagged with {@code
     * V_PREVIEW}.
     */
    V_PREVIEW: number
    
    // Access flags values, defined in
    // - https://docs.oracle.com/javase/specs/jvms/se9/html/jvms-4.html#jvms-4.1-200-E.1
    // - https://docs.oracle.com/javase/specs/jvms/se9/html/jvms-4.html#jvms-4.5-200-A.1
    // - https://docs.oracle.com/javase/specs/jvms/se9/html/jvms-4.html#jvms-4.6-200-A.1
    // - https://docs.oracle.com/javase/specs/jvms/se9/html/jvms-4.html#jvms-4.7.25
    
    ACC_PUBLIC: number
    ACC_PRIVATE: number
    ACC_PROTECTED: number
    ACC_STATIC: number
    ACC_FINAL: number
    ACC_SUPER: number
    ACC_SYNCHRONIZED: number
    ACC_OPEN: number
    ACC_TRANSITIVE: number
    ACC_VOLATILE: number
    ACC_BRIDGE: number
    ACC_STATIC_PHASE: number
    ACC_VARARGS: number
    ACC_TRANSIENT: number
    ACC_NATIVE: number
    ACC_INTERFACE: number
    ACC_ABSTRACT: number
    ACC_STRICT: number
    ACC_SYNTHETIC: number
    ACC_ANNOTATION: number
    ACC_ENUM: number
    ACC_MANDATED: number
    ACC_MODULE: number
    
    // ASM specific access flags.
    // WARNING: the 16 least significant bits must NOT be used, to avoid conflicts with standard
    // access flags, and also to make sure that these flags are automatically filtered out when
    // written in class files (because access flags are stored using 16 bits only).
    
    ACC_RECORD: number
    ACC_DEPRECATED: number
    
    // Possible values for the type operand of the NEWARRAY instruction.
    // See https://docs.oracle.com/javase/specs/jvms/se9/html/jvms-6.html#jvms-6.5.newarray.
    
    T_BOOLEAN: number
    T_CHAR: number
    T_FLOAT: number
    T_DOUBLE: number
    T_BYTE: number
    T_SHORT: number
    T_INT: number
    T_LONG: number
    
    // Possible values for the reference_kind field of CONSTANT_MethodHandle_info structures.
    // See https://docs.oracle.com/javase/specs/jvms/se9/html/jvms-4.html#jvms-4.4.8.
    
    H_GETFIELD: number
    H_GETSTATIC: number
    H_PUTFIELD: number
    H_PUTSTATIC: number
    H_INVOKEVIRTUAL: number
    H_INVOKESTATIC: number
    H_INVOKESPECIAL: number
    H_NEWINVOKESPECIAL: number
    H_INVOKEINTERFACE: number
    
    // ASM specific stack map frame types, used in {@link ClassVisitor#visitFrame}.
    
    /** An expanded frame. See {@link ClassReader#EXPAND_FRAMES}. */
    F_NEW: number
    
    /** A compressed frame with complete frame data. */
    F_FULL: number
    
    /**
     * A compressed frame where locals are the same as the locals in the previous frame, except that
     * additional 1-3 locals are defined, and with an empty stack.
     */
    F_APPEND: number
    
    /**
     * A compressed frame where locals are the same as the locals in the previous frame, except that
     * the last 1-3 locals are absent and with an empty stack.
     */
    F_CHOP: number
    
    /**
     * A compressed frame with exactly the same locals as the previous frame and with an empty stack.
     */
    F_SAME: number
    
    /**
     * A compressed frame with exactly the same locals as the previous frame and with a single value
     * on the stack.
     */
    F_SAME1: number
    
    // Standard stack map frame element types, used in {@link ClassVisitor#visitFrame}.
    
    TOP: number
    INTEGER: number
    FLOAT: number
    DOUBLE: number
    LONG: number
    NULL: number
    UNINITIALIZED_THIS: number
    
    // The JVM opcode values (with the MethodVisitor method name used to visit them in comment, and
    // where '-' means 'same method name as on the previous line').
    // See https://docs.oracle.com/javase/specs/jvms/se9/html/jvms-6.html.
    
    NOP: number
    ACONST_NULL: number
    ICONST_M1: number
    ICONST_0: number
    ICONST_1: number
    ICONST_2: number
    ICONST_3: number
    ICONST_4: number
    ICONST_5: number
    LCONST_0: number
    LCONST_1: number
    FCONST_0: number
    FCONST_1: number
    FCONST_2: number
    DCONST_0: number
    DCONST_1: number
    BIPUSH: number
    SIPUSH: number
    LDC: number
    ILOAD: number
    LLOAD: number
    FLOAD: number
    DLOAD: number
    ALOAD: number
    IALOAD: number
    LALOAD: number
    FALOAD: number
    DALOAD: number
    AALOAD: number
    BALOAD: number
    CALOAD: number
    SALOAD: number
    ISTORE: number
    LSTORE: number
    FSTORE: number
    DSTORE: number
    ASTORE: number
    IASTORE: number
    LASTORE: number
    FASTORE: number
    DASTORE: number
    AASTORE: number
    BASTORE: number
    CASTORE: number
    SASTORE: number
    POP: number
    POP2: number
    DUP: number
    DUP_X1: number
    DUP_X2: number
    DUP2: number
    DUP2_X1: number
    DUP2_X2: number
    SWAP: number
    IADD: number
    LADD: number
    FADD: number
    DADD: number
    ISUB: number
    LSUB: number
    FSUB: number
    DSUB: number
    IMUL: number
    LMUL: number
    FMUL: number
    DMUL: number
    IDIV: number
    LDIV: number
    FDIV: number
    DDIV: number
    IREM: number
    LREM: number
    FREM: number
    DREM: number
    INEG: number
    LNEG: number
    FNEG: number
    DNEG: number
    ISHL: number
    LSHL: number
    ISHR: number
    LSHR: number
    IUSHR: number
    LUSHR: number
    IAND: number
    LAND: number
    IOR: number
    LOR: number
    IXOR: number
    LXOR: number
    IINC: number
    I2L: number
    I2F: number
    I2D: number
    L2I: number
    L2F: number
    L2D: number
    F2I: number
    F2L: number
    F2D: number
    D2I: number
    D2L: number
    D2F: number
    I2B: number
    I2C: number
    I2S: number
    LCMP: number
    FCMPL: number
    FCMPG: number
    DCMPL: number
    DCMPG: number
    IFEQ: number
    IFNE: number
    IFLT: number
    IFGE: number
    IFGT: number
    IFLE: number
    IF_ICMPEQ: number
    IF_ICMPNE: number
    IF_ICMPLT: number
    IF_ICMPGE: number
    IF_ICMPGT: number
    IF_ICMPLE: number
    IF_ACMPEQ: number
    IF_ACMPNE: number
    GOTO: number
    JSR: number
    RET: number
    TABLESWITCH: number
    LOOKUPSWITCH: number
    IRETURN: number
    LRETURN: number
    FRETURN: number
    DRETURN: number
    ARETURN: number
    RETURN: number
    GETSTATIC: number
    PUTSTATIC: number
    GETFIELD: number
    PUTFIELD: number
    INVOKEVIRTUAL: number
    INVOKESPECIAL: number
    INVOKESTATIC: number
    INVOKEINTERFACE: number
    INVOKEDYNAMIC: number
    NEW: number
    NEWARRAY: number
    ANEWARRAY: number
    ARRAYLENGTH: number
    ATHROW: number
    CHECKCAST: number
    INSTANCEOF: number
    MONITORENTER: number
    MONITOREXIT: number
    MULTIANEWARRAY: number
    IFNULL: number
    IFNONNULL: number
}

declare interface Java {
    type(name: 'org.objectweb.asm.tree.InsnList'): _InsnList
    
    type(name: 'org.objectweb.asm.tree.AbstractInsnNode'): _AbstractInsnNode
    
    type(name: 'org.objectweb.asm.tree.InsnNode'): _InsnNode
    
    type(name: 'org.objectweb.asm.tree.LdcInsnNode'): _LdcInsnNode
    
    type(name: 'org.objectweb.asm.tree.MethodInsnNode'): _MethodInsnNode
    
    type(name: 'org.objectweb.asm.tree.VarInsnNode'): _VarInsnNode
    
    type(name: 'org.objectweb.asm.tree.MethodNode'): _MethodNode
    
    type(name: 'org.objectweb.asm.tree.TypeInsnNode'): _TypeInsnNode
    
    type(name: 'org.objectweb.asm.tree.InsnNode'): _InsnNode
    
    type(name: 'org.objectweb.asm.tree.InsnNode'): _InsnNode
    
    type(name: 'org.objectweb.asm.Opcodes'): _Opcodes
}



