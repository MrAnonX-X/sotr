import { DiceEngine } from "../engines/dice-engine.js";

export class SOTRItem extends Item {

    async rollDice() {
        
        if (this.type !== "skill") {
            throw new Error(
                `SOTR | ${this.name} is not Skill`
            )
        }

        return DiceEngine.rollSkill(this.system.resolution.dice);
    }
}