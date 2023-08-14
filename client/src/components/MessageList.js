import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const MessageList = (props) => {
    const [messageList, setMessageList] = useState([])
    const getMessages = async () => {
        try {
            const response = await fetch("/api/v1/messages")
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const responseBody = await response.json()
            setMessageList(responseBody.messageList)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }
    useEffect(() => {
        getMessages()
    }, [])

    const messagesToRender = messageList.map((message) => {
        return (
            <div key={message.id}>
                id={message.id}
                userId={message.userId}
                content={message.content}
                image={message.image}
            </div>
        )
    })
    return (
        <div>
            <h1>Welcome to Leland Stanford Community MessageBoard</h1>
            <div>
                <Link to ="/new-message" className="button">
                    <h3>Add New Message</h3>
                </Link>
            </div>
            <div className="container">
                <div>{messagesToRender}</div>
            </div>
        </div>
    )

}
export default MessageList

