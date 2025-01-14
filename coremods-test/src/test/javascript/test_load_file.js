/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
function initializeCoreMod() {
    var ASMAPI = Java.type('net.minecraftforge.coremod.api.ASMAPI');
    // Why is this arbitrarily limited to being loaded at start?
    if (!ASMAPI.loadFile('test_load_file_extra.js'))
        throw "Could not load extra script";

    return {
        'coremodmethod': {
            'target': {
                'type': 'METHOD',
                'class': 'net.minecraftforge.coremod.testjar.TestClass',
                'methodName': 'testString',
                'methodDesc': '()Ljava/lang/String;'
            },
            'transformer': function(method) {
                var Opcodes = Java.type('org.objectweb.asm.Opcodes');
                var LdcInsnNode = Java.type('org.objectweb.asm.tree.LdcInsnNode');

                var arrayLength = method.instructions.size();
                for (var i = 0; i < arrayLength; ++i) {
                    var instruction = method.instructions.get(i);
                    if (instruction.getOpcode() == Opcodes.LDC) {
                        var newInstruction = new LdcInsnNode(extraFunction());
                        method.instructions.insertBefore(instruction, newInstruction);
                        method.instructions.remove(instruction);
                        print("Manually replaced string with " + extraFunction());
                        break;
                    }
                }
                return method;
            }
        }
    }
}