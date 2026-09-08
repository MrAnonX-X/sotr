import { SOTRActorData } from "../data/actor-data.js";
import { SOTRActor } from "../documents/actor.js";

import { SOTRSkillData } from "../data/skill-data.js";
import { SOTRStatusData } from "../data/status-data.js";
import { SOTRTreasureData} from "../data/treasure-data.js";
import { SOTRItem } from "../documents/item.js";

import { ClashEngine } from "../engines/clash-engine.js";

export function initializeSystem() {

    CONFIG.Actor.dataModels.character = SOTRActorData;
    CONFIG.Actor.documentClass = SOTRActor;

    CONFIG.Item.dataModels.skill = SOTRSkillData;
    CONFIG.Item.dataModels.treasure = SOTRTreasureData;
    CONFIG.Item.dataModels.status = SOTRStatusData;
    CONFIG.Item.documentClass = SOTRItem;

    globalThis.ClashEngine = ClashEngine;
}