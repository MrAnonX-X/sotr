import { DiceEngine } from "./dice-engine.js";

export class ClashEngine {

    // Model "clash" creation

    static create(firstSkill, secondSkill) {

        if (firstSkill.type !== "skill" || secondSkill.type !== "skill") {
            throw new Error(
                `SOTR | ClashEngine.create() requires two Skill items`
            )
        }

        const firstActor = firstSkill.actor;
        const secondActor = secondSkill.actor;

        if (!firstActor || !secondActor ) {
            throw new Error("ClashEngine.create: first/second Skill has no Actor");
        }

        if (firstActor === secondActor) {
            throw new Error("ClashEngine.create: Skills belong to the same Actor");
        }

        return ({
            model: "clash",
            first: {
                actor: firstActor,
                skill: firstSkill,

                dice: [],
                currentIndex: 0,

                skill_effects: [],
                pending_effects: []
            },
            second: {
                actor: secondActor,
                skill: secondSkill,

                dice: [],
                currentIndex: 0,

                skill_effects: [],
                pending_effects: []
            },

            state: "created"
        });

    }

    // Inidividual clash resolver

    static resolveDiceClash(firstDie, secondDie) {
        const firstType = this.getDiceCategory(firstDie);
        const secondType = this.getDiceCategory(secondDie);

        const firstResult = firstDie.dice[0].result;
        const secondResult = secondDie.dice[0].result;

        // firstResult === secondResult.

        if (firstResult === secondResult) {
            console.log(`SOTR | Tie`)
            return {
                winner: "tie",
                first: {action: "consume"}, second: {action: "consume"},
                clash_result: []
            };}
       
        // Offensive VS Offensive

        if (firstType === "offensive" && secondType === "offensive") {
            const winner = firstResult > secondResult ? "first" : "second";

            const winnerResult = winner === "first" ? firstResult : secondResult;

            return {
                winner,
                first: { action: "consume"},
                second: { action: "consume" },
                clash_result: [
                    {
                        type: "damage",
                        source: winner,
                        target: winner === "first" ? "second" : "first",
                        value: winnerResult,
                        affinity: winner === "first" ? firstDie.dice[0].type : secondDie.dice[0].type
                    }
                ]
            }
        }

        // Offensive VS Defensive

        if (firstType === "offensive" && secondType === "defensive") {
            return this.resolveOffensiveVSDefensive(firstDie, secondDie, "first", "second");
        }

        if (firstType === "defensive" && secondType === "offensive") {
            return this.resolveOffensiveVSDefensive(secondDie, firstDie, "second", "first");
        }

        // Offensive VS Evade

        if (firstType === "offensive" && secondType === "evade") {
            return this.resolveOffensiveVSEvade(firstDie, secondDie, "first", "second");
        }

        if (firstType === "evade" && secondType === "offensive") {
            return this.resolveOffensiveVSEvade(secondDie, firstDie, "second", "first");
        }

        // Defensive VS Evade

        if (firstType === "defensive" && secondType === "evade") {
            return this.resolveDefensiveVSEvade(firstDie, secondDie, "first", "second");
        }

        if (firstType === "evade" && secondType === "defensive") {
            return this.resolveDefensiveVSEvade(secondDie, firstDie, "second", "first");
        }

        // Defensive VS Defensive

        if (firstType === "defensive" && secondType === "defensive") {
            const winner = firstResult > secondResult ? "first" : "second";

            const winnerResult = winner === "first" ? firstResult : secondResult;

            return {
                winner,
                first: { action: "consume" },
                second: { action: "consume" },
                clash_result: [
                    {
                        type: "stagger-damage",
                        source: winner,
                        target: winner === "first" ? "second" : "first",
                        value: winnerResult
                    }
                ]
            }
        }

        if (firstType === "evade" && secondType === "evade") {
            return {
                winner: "none",
                first: {action: "consume"}, second: {action: "consume"},
                clash_result: []
            };}

        throw new Error(`SOTR | Unsupported Dice Clash: ${firstType} vs ${secondType}`);
    }

    // Helper methods for resolveDiceClash()
        // Returns the category of a die based on its type

    static getDiceCategory(die) {
        
        const type = die.dice[0].type

        if (["slash", "pierce", "blunt"].includes(type)) {
            return "offensive";
        }

        if (type === "block") {
            return "defensive";
        }

        if (type === "evade") {
            return "evade";
        }

        throw new Error(`Unknown Dice type: ${type}`);

    }

        // Offensive VS Defensive resolver

    static resolveOffensiveVSDefensive(offensiveDie, defensiveDie, offensiveSide, defensiveSide) {
        if (offensiveDie.dice[0].result > defensiveDie.dice[0].result) {
                return {
                    winner: offensiveSide,

                    [offensiveSide]: { action: "consume"}, 

                    [defensiveSide]: { action: "consume" },

                    clash_result: [
                        {
                            type: "damage",
                            source: offensiveSide,
                            target: defensiveSide,
                            value: offensiveDie.dice[0].result - defensiveDie.dice[0].result,
                            affinity: offensiveDie.dice[0].type
                        }
                    ]
                };
            }
        if (offensiveDie.dice[0].result < defensiveDie.dice[0].result) {
            return {
                winner: defensiveSide,

                [offensiveSide]: { action: "consume" },

                [defensiveSide]: { action: "consume" },

                clash_result: [ 
                    {
                        type: "stagger-damage",
                        source: defensiveSide,
                        target: offensiveSide,
                        value: defensiveDie.dice[0].result
                    }
                ]
            };
        }

        //Tie is resolved by resolveDiceClash()
    }

        // Offensive VS Evade resolver

    static resolveOffensiveVSEvade(offensiveDie, evadeDie, offensiveSide, evadeSide) {
        if (offensiveDie.dice[0].result > evadeDie.dice[0].result) {
            return {
                winner: offensiveSide,

                [offensiveSide]: { action: "consume"},

                [evadeSide]: { action: "consume" },

                clash_result: [
                    {
                        type: "damage",
                        source: offensiveSide,
                        target: evadeSide,
                        value: offensiveDie.dice[0].result,
                        affinity: offensiveDie.dice[0].type
                    }
                ]
            };
        }
        if (offensiveDie.dice[0].result < evadeDie.dice[0].result) {
            return {
                winner: evadeSide,

                [offensiveSide]: { action: "consume" },

                [evadeSide]: { action: "re-use" },

                clash_result: [
                    {
                        type: "stagger-recover",
                        source: evadeSide,
                        target: evadeSide,
                        value: evadeDie.dice[0].result
                    }
                ]
            };
        }

        // Tie is resolved by resolveDiceClash()
    }

        // Defensive VS Evade resolver

    static resolveDefensiveVSEvade(defensiveDie, evadeDie, defensiveSide, evadeSide) {
        if (defensiveDie.dice[0].result > evadeDie.dice[0].result) {
            return {
                winner: defensiveSide,

                [defensiveSide]: { action: "consume" },

                [evadeSide]: { action: "consume" },

                clash_result: []
            };
        }
        if (defensiveDie.dice[0].result < evadeDie.dice[0].result) {
            return {
                winner: evadeSide,

                [defensiveSide]: { action: "consume" },

                [evadeSide]: { action: "consume" },
                
                clash_result: [
                    {
                        type: "stagger-recover",   
                        source: evadeSide,
                        target: evadeSide,
                        value: evadeDie.dice[0].result
                    }
                ]
            };
        }

        // Tie is resolved by resolveDiceClash()
    }

    // Model "clash" resolution

    static async resolve(clash) {
        if (clash.state !== "created") {
            throw new Error(`Wrong state: ${clash.state}`);
        }

        clash.state = "preparing";

        // here will be execution of Effects with tags which start before initial roll

        clash.state = "rolling"

        clash.first.dice = await DiceEngine.rollSkill(clash.first.skill.system.resolution.dice);
        clash.second.dice = await DiceEngine.rollSkill(clash.second.skill.system.resolution.dice);

        clash.state = "resolving";

        while (this.hasRemainingDice(clash.first) && this.hasRemainingDice(clash.second)) {
            const firstDie = this.getCurrentDie(clash.first);
            const secondDie = this.getCurrentDie(clash.second);

            const result = this.resolveDiceClash(firstDie, secondDie);

            await this.processClashResult(clash, result);

            for (const sideName of ["first", "second"]) {
                await this.applyAction(clash, sideName, result);
            }
        }

        while (this.hasRemainingDice(clash.first)) {

            const firstDie = this.getCurrentDie(clash.first);

            const result = this.resolveRemainingDie("first", firstDie);

            await this.processClashResult(clash, result);

            await this.applyAction(clash, "first", result);
        }


        while (this.hasRemainingDice(clash.second)) {

            const secondDie = this.getCurrentDie(clash.second);

            const result = this.resolveRemainingDie("second", secondDie);

            await this.processClashResult(clash, result);

            await this.applyAction(clash, "second", result);
        }

        clash.state = "concluded";

        // here will be execution of Effects with tags which start after clash

        clash.state = "resolved";

        return clash;

    }

    // Helper methods for clash resolve() 
        // for easier reading of code

    static getCurrentDie(side){
        return side.dice[side.currentIndex] ?? null;
    }    

    static hasRemainingDice(side) {
        return side.currentIndex < side.dice.length;
    }

        // resolver for die action on actors

    static async applyAction(clash, sideName, result) {
            
        const action = result[sideName].action;

        switch (action) {
            case "consume":
                console.log(`SOTR | die consumed`)
                clash[sideName].currentIndex++;
                break;
            case "re-use":
                console.log(`SOTR | die re-used`)
                await DiceEngine.reroll(clash[sideName].dice[clash[sideName].currentIndex]);
                break;
            default:
                throw new Error(`Unknown action: ${action}`);
        }
    }

        // resolver of effects and clash effects

    static async processClashResult(clash, result) {
        for (const event of result.clash_result) {

            const sourceActor = clash[event.source].actor;
            const targetActor = clash[event.target].actor;

            switch (event.type) {
                case "damage":

                    console.log(`SOTR | ${sourceActor.name} deals ${event.value} ${event.affinity} damage to ${targetActor.name}`);
                    // DamageEngine.apply(...)
                break;
                
                case "stagger-damage":
                    console.log(`SOTR | ${sourceActor.name} deals ${event.value} stagger damage to ${targetActor.name}`);
                    // StaggerEngine.apply(...)
                break;

                case "stagger-recover":
                    console.log(`SOTR | ${targetActor.name} recovers ${event.value} stagger`);
                    // StaggerEngine.recover(...)
                break;

                default:
                    console.warn(`SOTR | Unknown clash result type: ${event.type}`);
            } 
        }
    }

        // Resolves remaining die that has no opposing die

    static resolveRemainingDie(sideName, die) {

        if (this.getDiceCategory(die) !== "offensive") {

            console.log(`SOTR | Unnoposed defensive or evade die`)

            return {
                
                [sideName]:{ action: "consume" },

                clash_result: []
            }
        }
        console.log(`SOTR | Unnoposed offensive die`)
        return {
            [sideName]: {action: "consume" },

            clash_result: [{

                type: "damage",

                source: sideName,
                target: sideName === "first" ? "second" : "first",
                value: die.dice[0].result,

                affinity: die.dice[0].type
            }]
        }
    }
}