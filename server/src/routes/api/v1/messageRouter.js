import express from "express"
import uploadImage from "../../../services/uploadImage.js";
import { Message } from "../../../models/index.js"

const messageRouter = new express.Router()

messageRouter.get("/", async (req,res) => {
    try {
        const messages = await Message.query()
        return res.status(200).json({messages:messages})
    } catch (error) {
        return res.status(500).json({errors:error})
    }
})
export default messageRouter