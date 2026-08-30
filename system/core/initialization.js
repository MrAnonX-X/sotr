import { SOTRActorData } from "../data/actor-data.js";
import { SOTRActor } from "../documents/actor.js";

export function initializeSystem() {

    CONFIG.Actor.dataModels.character = SOTRActorData;

    CONFIG.Actor.documentClass = SOTRActor;

}