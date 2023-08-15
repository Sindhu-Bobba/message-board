import React, { useEffect, useState } from "react"

const MessageShow = (props) => {
    console.log(props)
    const [message, setMessage] = useState({
        content: "",
        image: "",
        userId: "",
    })

    const currentUser = props.user;
    const messageId = props.match.params.id;

    const getMessage = async () => {
        try {
            const response = await fetch(`/api/v1/messages/${messageId}`)
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`)
            }
            const body = await response.json();
            setMessage(body.message);
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }
    useEffect(() => {
        getMessage()
    }, [])


    return (
        <div>
            <div>
                <h3>{message.content}</h3>
                {message.image && <img src={message.image} alt={message.content} />}
            </div>

        </div>

    )

}
export default MessageShow
