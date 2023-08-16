import React from "react"
import { Link } from "react-router-dom"

const MessageTile = ({ content, id, image }) => {
    return (
        <Link to={`/messages/${id}`}>
            <div>
                <h4>{content}</h4>
            </div>
            <div>
                <img src={image}/>
            </div>
        </Link>
    )
}
export default MessageTile