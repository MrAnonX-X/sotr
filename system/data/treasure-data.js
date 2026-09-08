import { SOTREffectData } from "./effect-data.js";

export class SOTRTreasureData extends foundry.abstract.TypeDataModel {

    static defineSchema() {

        const {
            SchemaField,
            NumberField,
            StringField,
            ArrayField,
            EmbeddedDataField,
            BooleanField,
        } = foundry.data.fields;

        return {
            state: new StringField ({ initial: "inactive", choices: ["active", "inactive", "usable"]}),
            duration: new NumberField ({required: false, nullable: true, initial: null, min: 0}),
            available: new BooleanField ({ initial: true}),
            quantity: new NumberField ({required: false, nullable: true, initial: null, min: 0}),
            effects: new ArrayField(new EmbeddedDataField(SOTREffectData))
        }

    }

}