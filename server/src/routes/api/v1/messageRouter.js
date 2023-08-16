import express from "express"
import { Message } from "../../../models/index.js"
import cleanUserInput from "../../../services/cleanUserInput.js";
import { ValidationError } from "objection";
import uploadImage from "../../../services/uploadImage.js";

const messageRouter = new express.Router()

messageRouter.get("/", async (req, res) => {
    try {
        const messages = await Message.query()
        return res.status(200).json({ messageList: messages })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

messageRouter.get("/:id", async (req, res) => {
    const { id } = req.params
    try {
        const message = await Message.query().findById(id)
        return res.status(200).json({ message: message })
    } catch (error) {
        return res.status(500).json({ errors: error });
    }
})

messageRouter.post('/',uploadImage.single("image"), async (req, res) => {
    try {
        const { body, user } = req;
        const formInput = cleanUserInput(body);
        const data = {
            ...formInput,
            image: req.file?.location,
            userId: user.id
        };
        const newMessage = await Message.query().insertAndFetch(data);
        res.status(201).json({ message: newMessage });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ errors: error.data })
        }
        return res.status(500).json({ errors: error })
    }
});

export default messageRouter