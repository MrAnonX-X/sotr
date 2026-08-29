import { initializeSystem } from "./system/core/initialization.js";

Hooks.once("init", initializeSystem);