import { SOTREffectData } from "./effect-data.js";

export class SOTRStatusData extends foundry.abstract.TypeDataModel {

    static defineSchema() {

        const {
            SchemaField,
            NumberField,
            StringField,
            ArrayField,
            EmbeddedDataField,
        } = foundry.data.fields;

        return {
            classification: new StringField ({ initial: "buff" }),
            parameters: new SchemaField ({
                potency: new NumberField ({required: false, nullable: true, initial: null, min: 0}),
                count: new NumberField ({required: false, nullable: true, initial: null, min: 0}),
            }),
            effects: new ArrayField(new EmbeddedDataField(SOTREffectData))
        }

    }

}