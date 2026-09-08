import { SOTRConditionData } from "./condition-data.js";

export class SOTREffectData extends foundry.abstract.TypeDataModel {
    
    static defineSchema() {

        const {
            SchemaField,
            NumberField,
            StringField,
            ArrayField,
            EmbeddedDataField,
        } = foundry.data.fields;

        return {
            id: new StringField ({ initial: ""}),
            state: new StringField ({ initial: "inactive", choices: ["active", "inactive"]}),
            trigger: new StringField ({ initial: "null"}),
            condition: new ArrayField(new EmbeddedDataField(SOTRConditionData)),
            actions: new ArrayField(
                new StringField(),
                {
                    initial: []
                }
            )
        }
    }
}