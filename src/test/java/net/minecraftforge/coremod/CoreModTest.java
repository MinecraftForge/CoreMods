package net.minecraftforge.coremod;

import cpw.mods.modlauncher.api.*;
import net.minecraftforge.forgespi.coremod.*;
import org.junit.jupiter.api.*;
import org.objectweb.asm.tree.*;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.util.stream.*;

public class CoreModTest {

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
    }
    @SuppressWarnings("unchecked")
    @Test
    void testJSLoading() {
        final CoreModEngine coreModEngine = new CoreModEngine();
        coreModEngine.loadCoreMod(new JSFileLoader("src/test/javascript/testcoremod.js"));
        coreModEngine.loadCoreMod(new JSFileLoader("src/test/javascript/testcore2mod.js"));
        final List<ITransformer<?>> iTransformers = coreModEngine.initializeCoreMods();
        iTransformers.forEach(t -> {
            System.out.printf("targ: %s\n", t.targets().stream().map(ITransformer.Target::getClassName).collect(Collectors.joining(",")));
            ClassNode cn = new ClassNode();
            cn.name = "HelloWorld";
            ClassNode newcn = ((ITransformer<ClassNode>)t).transform(cn, null);
            System.out.println(newcn.methods.stream().map(m->m.name).collect(Collectors.joining(",")));
        });
    }
}
