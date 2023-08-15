const Model = require("./Model.js")

class Message extends Model {
    static get tableName() {
        return "messages"
    }
    static get jsonSchema() {
        return {
            type: "object",
            required: ["content"],
            properties: {
                content: { type: "string" },
                image: { type: "string" },
                userId: { type: ["string", "integer"] },
            },
        }
    }
}
module.exports = Message