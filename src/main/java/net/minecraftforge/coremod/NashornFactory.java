package net.minecraftforge.coremod;

import javax.script.ScriptEngine;

import jdk.nashorn.api.scripting.NashornScriptEngineFactory;

class NashornFactory {
    static ScriptEngine createEngine() {
        return new NashornScriptEngineFactory().getScriptEngine(CoreModEngine::checkClass);
    }
}
