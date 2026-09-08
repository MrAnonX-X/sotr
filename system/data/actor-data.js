export class SOTRActorData extends foundry.abstract.TypeDataModel {

    static defineSchema() {
        const { 
            NumberField,
            SchemaField,
            StringField
         } = foundry.data.fields;

        return {
            attributes: new SchemaField({
                might: new NumberField({ initial: 1 , min: 1}),
                vitality: new NumberField({ initial: 1, min: 1 }),
                agility: new NumberField({ initial: 1, min: 1 }),
                intellect: new NumberField({ initial: 1, min: 1 }),
                instinct: new NumberField({ initial: 1, min: 1 }),
                persona: new NumberField({ initial: 1, min: 1 })
            }),
            
            resources: new SchemaField ({
                hp: new SchemaField ({
                    base: new NumberField ({initial: 10, min: 0}),
                    current: new NumberField ({initial: 10, min: 0}),
                }),
                sp: new SchemaField ({
                    base: new NumberField ({initial: 10, min: 0}),
                    current: new NumberField ({initial: 10, min: 0}),
                }),
                light: new SchemaField ({
                    base: new NumberField ({initial: 3, min: 0}),
                    current: new NumberField ({initial: 3, min: 0}),
                    recovery: new NumberField ({initial: 1, min: 0}),
                }),
                speed: new SchemaField ({
                    diceSize: new NumberField ({initial: 4, min: 1}),
                    quantity: new NumberField ({initial: 1, min: 1}),
                    modifiers: new NumberField ({initial: 0 }),
                }),

            }),

            resistances: new SchemaField ({
                hp: new SchemaField ({
                    slash: new NumberField ({ initial: 0, integer: true, min: -4, max: 6 }),
                    pierce: new NumberField ({ initial: 0, integer: true, min: -4, max: 6 }),
                    blunt: new NumberField ({ initial: 0, integer: true, min: -4, max: 6 }),
                }),
                sp: new SchemaField ({
                    slash: new NumberField ({ initial: 0, integer: true, min: -4, max: 6 }),
                    pierce: new NumberField ({ initial: 0, integer: true, min: -4, max: 6 }),
                    blunt: new NumberField ({ initial: 0, integer: true, min: -4, max: 6 }),
                }),
            }),
            
            conditions: new SchemaField ({
                injuries: new NumberField ({initial: 0, min: 0}),
                anxieties: new NumberField ({initial: 0, min: 0}),
                excellence: new NumberField ({initial: 0, min: 0}),
            }),
            
            classification: new StringField ({
                initial: "base",
                choices: ["player", "base", "abnormalities", "distortions", "peccatula"]
            })
        }
    }
}