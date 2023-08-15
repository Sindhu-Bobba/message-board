import express from "express"
import { Message } from "../../../models/index.js"

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
export default messageRouter