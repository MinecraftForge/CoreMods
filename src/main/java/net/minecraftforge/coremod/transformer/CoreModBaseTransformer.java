/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod.transformer;

import cpw.mods.modlauncher.api.ITransformer;
import cpw.mods.modlauncher.api.ITransformerVotingContext;
import cpw.mods.modlauncher.api.TransformerVoteResult;
import net.minecraftforge.coremod.CoreMod;
import net.minecraftforge.coremod.CoreModTracker;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.logging.log4j.Marker;
import org.apache.logging.log4j.MarkerManager;

import java.util.Set;
import java.util.function.Function;

/**
 * The base-level transformer for CoreMods.
 *
 * @param <T> The type of node to transform
 */
public abstract class CoreModBaseTransformer<T> implements ITransformer<T> {
    static final Logger LOGGER = LogManager.getLogger();
    static final Marker COREMOD = MarkerManager.getMarker("COREMOD");
    final CoreMod coreMod;
    final Set<Target> targets;
    final Function<T, T> function;
    final String coreName;

    /**
     * Creates a new base-level transformer with the given targets and transformer function.
     *
     * @param coreMod  The CoreMod that this transformer belongs to
     * @param coreName The name of the CoreMod
     * @param targets  The targets to apply this transformer to
     * @param function The transformer function
     */
    public CoreModBaseTransformer(CoreMod coreMod, final String coreName, final Set<Target> targets, final Function<T, T> function) {
        this.coreMod = coreMod;
        this.coreName = coreName;
        this.targets = targets;
        this.function = function;
    }

    /**
     * Transforms the given input node using the transformer function.
     *
     * @param input   The ASM input node to transform
     * @param context The voting context for ModLauncher
     * @return The transformed node
     */
    @Override
    public T transform(T input, ITransformerVotingContext context) {
        CoreModTracker.setCoreMod(coreMod);
        T result = input;
        try {
            result = runCoremod(result);
        } catch (Exception e) {
            LOGGER.error(COREMOD, "Error occurred applying transform of coremod {} function {}", this.coreMod.getPath(), this.coreName, e);
            // TODO CRASH THE FUCKING GAME HERE
        } finally {
            CoreModTracker.clearCoreMod();
        }
        return result;
    }

    abstract T runCoremod(T input);

    /**
     * The transformer vote that this CoreMod should use as a result of transformation.
     *
     * @param context The context of the vote
     * @return The desired transformer vote
     */
    @Override
    public TransformerVoteResult castVote(ITransformerVotingContext context) {
        return TransformerVoteResult.YES;
    }

    /**
     * Gets the desired transformer targets of this CoreMod.
     *
     * @return The targets for transformation
     *
     * @apiNote The result of this method does not usually indicate that it will be used directly in
     * @link #runCoremod(Object)}.
     */
    @Override
    public Set<Target> targets() {
        return targets;
    }

    /**
     * Gets the identification labels of this transformer to be used in ModLauncher.
     *
     * @return The identification labels
     */
    @Override
    public String[] labels() {
        return new String[] {coreMod.getFile().getOwnerId(), coreName};
    }
}
