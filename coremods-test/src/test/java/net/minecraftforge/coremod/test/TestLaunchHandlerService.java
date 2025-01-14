package net.minecraftforge.coremod.test;

import java.lang.invoke.MethodHandles;
import java.lang.invoke.MethodType;
import java.nio.file.Path;
import cpw.mods.modlauncher.api.ILaunchHandlerService;
import cpw.mods.modlauncher.api.ITransformingClassLoaderBuilder;
import cpw.mods.modlauncher.api.ServiceRunner;

// TODO: Remove this when we bump ML version
public class TestLaunchHandlerService implements ILaunchHandlerService {
    @Override
    public String name() {
        return "coremods.test";
    }

    @Override
    public void configureTransformationClassLoader(ITransformingClassLoaderBuilder builder) {
        var paths = System.getProperty("test.harness.game");
        if (paths == null)
            throw new IllegalStateException("No game path set");

        for (var path : paths.split(",")) {
            var file = Path.of(path);
            builder.addTransformationPath(file);
        }
    }

    @Override
    public ServiceRunner launchService(String[] arguments, ModuleLayer gameLayer) {
        try {
            var cls = System.getProperty("test.harness.callable");
            if (cls == null)
                throw new IllegalStateException("No test callback set");

            var callableLaunch = Class.forName(cls, true, Thread.currentThread().getContextClassLoader());
            //getClass().getModule().addReads(callableLaunch.getModule());

            var handle = MethodHandles.lookup().findStatic(callableLaunch, "supplier", MethodType.methodType(ServiceRunner.class));
            return (ServiceRunner)handle.invoke();
        } catch (Throwable e) {
            return sneak(e);
        }
    }
    @SuppressWarnings("unchecked")
    private static <E extends Throwable, R> R sneak(Throwable e) throws E {
        throw (E)e;
    }
}
