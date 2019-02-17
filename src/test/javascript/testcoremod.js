function initializeCoreMod() {
    print("Hello");
    return {
        'coremodone': {
            'target': {
                'type': 'CLASS',
                'name': 'cpw.mods.testtarget.Test'
            },
            'transformer': function(classNode) {
                print("Cheese ", classNode.name);
                var tmp=Java.type('net.minecraftforge.coremod.api.ASMAPI').getMethodNode()
                var opcodes = Java.type('org.objectweb.asm.Opcodes')
                tmp.name = 'dummyMethod';
                tmp.visitVarInsn(opcodes.ALOAD, 0);
                tmp.visitMethodInsn(opcodes.INVOKESTATIC, "net/minecraftforge/fml/FMLTransformers", "hackName", "()Ljava/lang/String;", false);
                tmp.visitFieldInsn(opcodes.PUTFIELD, "net/minecraft/client/gui/GuiMainMenu", "field_73975_c", "Ljava/lang/String;");
                classNode.methods.add(tmp);
                return classNode;
            }
        }
    }
}
