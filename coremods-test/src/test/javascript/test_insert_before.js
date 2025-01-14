/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
function initializeCoreMod() {
    return {
        'coremodmethod': {
            'target': {
                'type': 'METHOD',
                'class': 'net.minecraftforge.coremod.testjar.TestClass',
                'methodName': 'testCounter',
                'methodDesc': '()[I'
            },
            'transformer': function(method) {
                var Counter = "net/minecraftforge/coremod/testjar/Counter";
                var ASMAPI = Java.type('net.minecraftforge.coremod.api.ASMAPI');
                var VarInsnNode = Java.type('org.objectweb.asm.tree.VarInsnNode');
                var Opcodes = Java.type('org.objectweb.asm.Opcodes');

                var lst = ASMAPI.listOf(
                    ASMAPI.buildMethodCall(Counter, "increment", "()V", ASMAPI.MethodType.VIRTUAL),
                    new VarInsnNode(Opcodes.ALOAD, 0)
                );

                if (ASMAPI.insertInsnList(method, ASMAPI.MethodType.VIRTUAL, Counter, "push", "()V", lst, ASMAPI.InsertMode.INSERT_BEFORE) === false) {
                    throw "MethodInsnNode for push not found!";
                }

                print("Inserted increment before push");

                return method;
            }
        }
    }
}