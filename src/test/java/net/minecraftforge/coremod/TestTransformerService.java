package net.minecraftforge.coremod;

import cpw.mods.modlauncher.api.IEnvironment;
import cpw.mods.modlauncher.api.ITransformationService;
import cpw.mods.modlauncher.api.ITransformer;
import cpw.mods.modlauncher.api.IncompatibleEnvironmentException;

import javax.annotation.Nonnull;
import java.util.List;
import java.util.Set;

public class TestTransformerService implements ITransformationService {

    private List<ITransformer<?>> transformers;

    @Nonnull
    @Override
    public String name() {
        return "coremodtest";
    }

    @Override
    public void initialize(final IEnvironment environment) {
    }

    @Override
    public void beginScanning(final IEnvironment environment) {

    }

    @Override
    public void onLoad(final IEnvironment env, final Set<String> otherServices) throws IncompatibleEnvironmentException {

    }

    @SuppressWarnings({ "rawtypes", "unchecked" })
    @Nonnull
    @Override
    public List<ITransformer> transformers() {
        transformers = TestLaunchTransformer.getTransformers();
        return (List)transformers;
    }
}
