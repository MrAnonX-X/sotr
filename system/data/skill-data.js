import { SOTRPassiveData } from "./passive-data.js";
import { SOTREffectData } from "./effect-data.js";

export class SOTRSkillData extends foundry.abstract.TypeDataModel {

    static defineSchema() {
        const {
            SchemaField,
            NumberField,
            StringField,
            ArrayField,
            BooleanField,
            EmbeddedDataField,
        } = foundry.data.fields;

        return {
            cost: new NumberField ({ initial: 0, min: 0}),
            effect: new ArrayField(new EmbeddedDataField(SOTREffectData)),
            resolution: new SchemaField ({
                dice: new ArrayField(
                    new SchemaField ({
                        type: new StringField ({ initial: "slash", choices: ["slash", "pierce", "blunt", "block", "evade"]}),
                        diceSize: new NumberField ({ initial: 6, min: 1}),
                        modifier: new NumberField ({ initial: 0}),
                        effect: new ArrayField(new EmbeddedDataField(SOTREffectData))
                    })
              )
            }),
            EGO: new SchemaField ({
                check: new BooleanField ({ initial: false}),
                emotion_cost: new NumberField ({ initial: 0, min: 0}),
                ego_passive: new ArrayField(new EmbeddedDataField(SOTRPassiveData))
            })
                
        }
    }
}