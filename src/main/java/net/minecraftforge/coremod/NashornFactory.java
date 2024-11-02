/*
 * Copyright (c) Forge Development LLC
 * SPDX-License-Identifier: LGPL-2.1-only
 */
package net.minecraftforge.coremod;

import org.openjdk.nashorn.api.scripting.NashornScriptEngineFactory;
import org.openjdk.nashorn.api.scripting.ScriptObjectMirror;

import javax.script.Bindings;
import javax.script.ScriptEngine;
import java.util.Objects;
import java.util.function.Function;

class NashornFactory {
    // TODO for CoreMods 5.3 or 6.0: Consider args that improve performance
    // https://github.com/openjdk/nashorn/blob/2eb88e4024023ee8e9baacb7736f914e3aa68aa4/src/org.openjdk.nashorn/share/classes/org/openjdk/nashorn/internal/runtime/resources/Options.properties
    private static final String[] NASHORN_ARGS = new String[] {
        "--language=es6"
    };

    static ScriptEngine createEngine() {
        return new NashornScriptEngineFactory().getScriptEngine(NASHORN_ARGS, getAppClassLoader(), CoreModEngine::checkClass);
    }

    /** @see NashornScriptEngineFactory#getAppClassLoader() */
    @SuppressWarnings("JavadocReference")
    private static ClassLoader getAppClassLoader() {
        return Objects.requireNonNullElseGet(
            Thread.currentThread().getContextClassLoader(),
            NashornScriptEngineFactory.class::getClassLoader
        );
    }

    @SuppressWarnings("unchecked")
    static <A, R> Function<A, R> getFunction(Bindings obj) {
        return a -> (R) ((ScriptObjectMirror) obj).call(obj, a);
    }
}
