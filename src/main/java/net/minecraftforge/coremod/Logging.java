package net.minecraftforge.coremod;

import org.apache.logging.log4j.*;
import org.apache.logging.log4j.core.config.*;

public class Logging {
    public static final Logger cmlog = LogManager.getLogger("CoreMod");
    public static final Marker XFORM = MarkerManager.getMarker("XFORM");
    static {
        Configurator.setRootLevel(Level.DEBUG);
    }
}
