# CoreMods

New JavaScript based system for implementing CoreMods.

Why?

Because it means that it's a lot easier to manage the lifecycle correctly. We can isolate
CoreMod logic to the proper ClassLoading contexts without effort on the part of the Modder.

It hopefully also communicates that CoreMods are strictly arms-length : they operate on 
classes as they load _only_ - changing structures and behaviours through that means.

This is connected to Forge and FML through the CoreMod SPI being implemented in new Forge. 