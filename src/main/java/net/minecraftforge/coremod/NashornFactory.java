package net.minecraftforge.coremod;

import java.util.function.Function;

import javax.script.Bindings;
import javax.script.ScriptEngine;

import jdk.nashorn.api.scripting.NashornScriptEngineFactory;
import jdk.nashorn.api.scripting.ScriptObjectMirror;

class NashornFactory {
    static ScriptEngine createEngine() {
        return new NashornScriptEngineFactory().getScriptEngine(CoreModEngine::checkClass);
    }

    @SuppressWarnings("unchecked")
    static <A,R> Function<A,R> getFunction(Bindings obj) {
        return a -> (R)((ScriptObjectMirror)obj).call(obj, a);
    }
}
