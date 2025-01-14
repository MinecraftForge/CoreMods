/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
function initializeCoreMod() {
    var ASMAPI = Java.type('net.minecraftforge.coremod.api.ASMAPI');
    // Why is this arbitrarily limited to being loaded at start?
    var data = ASMAPI.loadData('test_load_data.json')
    if (data == null)
        throw "Could not load data";

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
                        var newInstruction = new LdcInsnNode(data.value);
                        method.instructions.insertBefore(instruction, newInstruction);
                        method.instructions.remove(instruction);
                        print("Manually replaced string with " + data.value);
                        break;
                    }
                }
                return method;
            }
        }
    }
}