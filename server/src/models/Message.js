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
    static get relationMappings() {
        const { User } = require("./index.js")
        return {
          users: {
            relation : Model.BelongsToOneRelation,
            modelClass:User,
            join: {
              from: "messages.userId",
              to: "users.id"
            }
          }
        }
      }
}
module.exports = Message