# CoreMods

CoreMods is a JavaScript-based system that acts as a wrapper around ObjectWeb ASM.

## Purpose

CoreMods need to be sandboxed, or otherwise isolated, in their own environments so that they are not able to cause early
class-loading. They transform classes as only as they are loaded and do not have access to objects outside of the
sandbox given to them. This helps prevent issues that would otherwise arise from CoreMods written traditionally in Java.

Since CoreMods integrates with ModLauncher's transformation system, it is easier to manage the lifecycle as CoreMods is
only responsible for managing the transformation as ModLauncher is instead the one responsible for providing the class
loading system.

## Usage

CoreMods are JavaScript files that are sandboxed by the limitations provided within the CoreMod engine. It is only able
to access a limited set of classes and packages. ASMAPI, included within CoreMods, exists to provide several helpful
tools for writing CoreMods. You can view this class yourself to see its usages, or you can find examples of it in other
CoreMods.

The best way to find examples for CoreMods is to look at Forge itself, since it includes complex examples that utilize
much of the functionality within the sandbox.
