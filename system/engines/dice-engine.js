export class DiceEngine {

    static async roll({
        type = "generic",
        size = 20,
        quantity = 1,
        modifier = 0,
    }) {

        const dice = [];

        for (let i = 0; i <= quantity; i++) {

            const roll = new Roll(`1d${size}`);
            await roll.evaluate();

            dice.push({
                index: i,
                type,
                size,
                modifier,
                result: roll.total + modifier,
                roll
            });
        }

        return {
            type,
            dice
        };
    }
}