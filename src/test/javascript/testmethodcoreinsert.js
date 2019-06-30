function initializeCoreMod() {
    return {
        'coremodmethod': {
            'target': {
                'type': 'METHOD',
                'class': 'cpw.mods.TestClass',
                'methodName': 'testInsert',
                'methodDesc': '()Z'
            },
            'transformer': function(method) {
                var ASMAPI = Java.type('net.minecraftforge.coremod.api.ASMAPI');
                var newList1 = ASMAPI.listOf(ASMAPI.buildMethodCall("cpw/mods/RedirectClass", "newMethod", "()Z", ASMAPI.MethodType.STATIC));
                if (ASMAPI.insertInsnList(method, ASMAPI.MethodType.STATIC, "cpw/mods/TestClass", "testMethod2", "()Z", newList1, ASMAPI.InsertMode.REMOVE_ORIGINAL) === false) {
                    throw "MethodInsnNode for testMethod2 not found!";
                }

                var newList2 = ASMAPI.listOf(ASMAPI.buildMethodCall("cpw/mods/RedirectClass", "afterMethod", "()V", ASMAPI.MethodType.STATIC));
                if (ASMAPI.insertInsnList(method, ASMAPI.MethodType.STATIC, "cpw/mods/TestClass", "testMethod1", "()J", newList2, ASMAPI.InsertMode.INSERT_AFTER) === false) {
                    throw "MethodInsnNode for insert after on testMethod1 not found!";
                }

                var newList3 = ASMAPI.listOf(ASMAPI.buildMethodCall("cpw/mods/RedirectClass", "beforeMethod", "()V", ASMAPI.MethodType.STATIC));
                if (ASMAPI.insertInsnList(method, ASMAPI.MethodType.STATIC, "cpw/mods/TestClass", "testMethod1", "()J", newList3, ASMAPI.InsertMode.INSERT_BEFORE) === false) {
                    throw "MethodInsnNode for insert before on testMethod1 not found!";
                }

                print("Redirects added!")
                return method;
            }
        }
    }
}