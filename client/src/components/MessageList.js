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
                {message.id}
                <p>content={message.content}</p>
                <p>{message.image}</p>
                <p>userId={message.userId}</p>
            </div>
        )
    })
    return (
        <div>
            <h2>Welcome to Leland Stanford Community MessageBoard</h2>
            <div>
                <Link to ="/new-message" className="button">
                    <h5>Add New Message</h5>
                </Link>
            </div>
            <div className="container">
                {messagesToRender}
            </div>
        </div>
    )

}
export default MessageList

