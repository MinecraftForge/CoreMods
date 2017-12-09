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
                var methodnode = Java.type('org.objectweb.asm.tree.MethodNode')
                var opcodes = Java.type('org.objectweb.asm.Opcodes')
                var tmp = new methodnode(opcodes.ASM5);
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
