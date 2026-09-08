import { SOTREffectData } from "./effect-data.js";

export class SOTRPassiveData extends foundry.abstract.TypeDataModel {

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
            state: new StringField ({ initial: "active", choices: ["active", "inactive"]}),
            duration: new NumberField ({required: false, nullable: true, initial: null, min: 0}),
            available: new BooleanField ({ initial: true}),
            effects: new ArrayField(new EmbeddedDataField(SOTREffectData))
        }
    }
}   