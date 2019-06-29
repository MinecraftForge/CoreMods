function initializeCoreMod() {
    return {
        'coremodmethod': {
            'target': {
                'type': 'METHOD',
                'class': 'cpw.mods.TestClass',
                'methodName': 'testMethod',
                'methodDesc': '()Z'
            },
            'transformer': function(method) {
                var Opcodes = Java.type('org.objectweb.asm.Opcodes');
                var arrayLength = method.instructions.size();
                for (var i = 0; i < arrayLength; ++i) {
                    var instruction = method.instructions.get(i);
                    if (instruction.getOpcode() == Opcodes.ICONST_1) {
                        var InsnNode = Java.type('org.objectweb.asm.tree.InsnNode');
                        var newInstruction = new InsnNode(Opcodes.ICONST_0);
                        method.instructions.insertBefore(instruction, newInstruction);
                        method.instructions.remove(instruction);
                        print("Transformed!");
                        break;
                    }
                }
                return method;
            }
        }
    }
}