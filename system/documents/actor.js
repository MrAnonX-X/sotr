import { DiceEngine } from "../engines/dice-engine.js";

export class SOTRActor extends Actor {

    async rollDice() {

        const speed = this.system.resources.speed;

        return DiceEngine.roll({
            type: "speed",
            size: speed.diceSize,
            quantity: speed.quantity
        });
    }

}