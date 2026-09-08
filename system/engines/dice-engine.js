export class DiceEngine {

    static async roll({
        type = "generic",
        diceSize = 20,
        quantity = 1,
        modifier = 0,
    }) {

        const dice = [];

        for (let i = 0; i < quantity; i++) {

            const roll = new Roll(`1d${diceSize}`);
            await roll.evaluate();

            dice.push({
                index: i,
                type,
                diceSize,
                modifier,
                rawResult: roll.total,
                result: roll.total + modifier,
                roll
            });
        }

        return {
            type,
            dice
        };
    }

    static async rollSkill(dice) {

        const results = [];

        for (const die of dice) {

            const result = await this.roll({
                type: die.type,
                diceSize: die.diceSize,
                modifier: die.modifier
            });

            result.dice[0].result = Math.max(0, result.dice[0].result);

            results.push(result);
        }

        return results;
    }

    static async reroll(die) {
        const currentDie = die.dice[0];

        const result = await this.roll({
            type: currentDie.type,
            diceSize: currentDie.diceSize,
            modifier: currentDie.modifier
        });

        die.dice[0] = result.dice[0];
        die.dice[0].result = Math.max(0, result.dice[0].result);

        return die;
    }
}