export class SOTRConditionData extends foundry.abstract.TypeDataModel {

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
            path: new StringField ({ initial: ""}),
            operator: new StringField ({ initial: "eq", choices: ["eq", "neq", "gt", "lt", "gte", "lte"]}),
            value: new StringField ({ initial: ""}),
        }
    }
}