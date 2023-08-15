import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const MessageList = (props) => {
    console.log(props)
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
                content={message.content}
                image={message.image}
                userId={message.userId}
            </div>
        )
    })
    return (
        <div>
            <h2>Welcome to Leland Stanford Community MessageBoard</h2>
            <div>
                <div className="button">
                    <h5>Add New Message</h5>
                </div>
            </div>
            <div className="container">
                <div>{messagesToRender}</div>
            </div>
        </div>
    )

}
export default MessageList

