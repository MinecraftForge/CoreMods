package net.minecraftforge.coremod;

import cpw.mods.modlauncher.api.ITransformer;
import net.minecraftforge.forgespi.coremod.ICoreModFile;
import org.junit.jupiter.api.Test;
import org.objectweb.asm.ClassReader;
import org.objectweb.asm.ClassWriter;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.tree.ClassNode;

import java.io.IOException;
import java.io.InputStream;
import java.io.Reader;
import java.nio.file.FileSystems;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.stream.Collectors;

public class APIModificationTest {

    private class JSFileLoader implements ICoreModFile {
        private final Path path;

        private JSFileLoader(final String path) {
            this.path = FileSystems.getDefault().getPath(path);
        }

        @Override
        public Reader readCoreMod() {
            try {
                return Files.newBufferedReader(this.path);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        @Override
        public Path getPath() {
            return this.path;
        }

        @Override
        public String getOwnerId() {
            return "dummy";
        }
    }
    @SuppressWarnings("unchecked")
    @Test
    void testJSLoading() {
/*
        final CoreModEngine coreModEngine = new CoreModEngine();
        coreModEngine.loadCoreMod(new JSFileLoader("src/test/javascript/testtransformer.js"));
        final List<ITransformer<?>> iTransformers = coreModEngine.initializeCoreMods();
        iTransformers.forEach(t -> {
            System.out.printf("targ: %s\n", t.targets().stream().map(ITransformer.Target::getClassName).collect(Collectors.joining(",")));
            final InputStream resourceAsStream = getClass().getResourceAsStream("cpw/mods/TestClass.class");
            ClassReader cr=new ClassReader(resourceAsStream);
            ClassNode cn = new ClassNode(Opcodes.ASM6);
            cr.accept(cn, ClassReader.EXPAND_FRAMES);
            ClassNode newcn = ((ITransformer<ClassNode>)t).transform(cn, null);
            ClassWriter cw = new ClassWriter(ClassWriter.COMPUTE_FRAMES);
            newcn.accept(cw);
            getClass().getClassLoader().cw.toByteArray();
            System.out.println(newcn.methods.stream().map(m->m.name).collect(Collectors.joining(",")));
        });
*/
    }
}
