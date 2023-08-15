import { Message } from "../../models/index.js"

class MessageSeeder {
    static async seed() {
        const siri = await Message.query().findOne("firstName", "Siri");
        const raksha = await Message.query().findOne("firstName", "Raksha");

        const messageData = [
            {
                content: "Looking for recommendations on the best hiking trails around here. Any suggestions?",
                userId: siri.id
            },
            {
                content: "Hello everyone! Just wanted to introduce myself. I'm new to this community and excited to connect with like-minded individuals.",
                userId: raksha.id

            }
        ]

        for (const singleMessage of messageData) {
            const currentMessage = await Message.query.findOne({ content: singleMessage.content })
            if (!currentMessage) {
                await Message.query().insert(singleMessage);
            }
        }
    }
}
export default MessageSeeder
