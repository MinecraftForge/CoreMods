package net.minecraftforge.coremod;

import javax.script.ScriptEngine;

import org.openjdk.nashorn.api.scripting.NashornScriptEngineFactory;

class NashornFactory {
    static ScriptEngine createEngine() {
        return new NashornScriptEngineFactory().getScriptEngine(CoreModEngine::checkClass);
    }
}
