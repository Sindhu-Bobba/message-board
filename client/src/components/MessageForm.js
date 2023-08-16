import React, { useState } from "react"
import translateServerError from "../services/translateServerErrors.js"
import { Redirect } from "react-router-dom"
import ErrorList from "./layout/ErrorList.js"
import Dropzone from "react-dropzone";

const MessageForm = (props) => {
    const [messageRecord, setMessageRecord] = useState({
        content: "",
        image: ""
    })
    const [errors, setErrors] = useState([]);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const addNewMessage = async (event) => {
        const messageFormData = new FormData()
        messageFormData.append("content", messageRecord.content);
        messageFormData.append("image", messageRecord.image);

        try {
            const response = await fetch("/api/v1/messages", {
                method: "POST",
                headers: {
                    "Accept": "image/jpeg"
                  },
                body: messageFormData
            });

            if (!response.ok) {
                if (response.status === 422) {
                    const body = await response.json();
                    const newErrors = translateServerError(body.error);
                    return setErrors(newErrors);
                } else {
                    const errorMessage = `${response.status} (${response.statusText})`;
                    const error = new Error(errorMessage);
                    throw error;
                }

            } else {
                setShouldRedirect(true)
            }
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    const handleChange = (event) => {
        setMessageRecord({
            ...messageRecord,
            [event.currentTarget.name]: event.currentTarget.value,
        })

    }

    const handleSubmit = (event) => {
        event.preventDefault()
        addNewMessage()
    }

    if (shouldRedirect) {
        return <Redirect push to="/" />
    }

    const handleImageUpload = (acceptedSiteImage) => {
        setMessageRecord({
            ...messageRecord,
            image: acceptedSiteImage[0],
        });
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <ErrorList errors={errors} />
                <label htmlFor="name">
                    <h4>
                        Message
                    </h4>
                    <input
                        id="name"
                        type="text"
                        name="content"
                        onChange={handleChange}
                        value={messageRecord.content}
                    />
                </label>
          
            <Dropzone onDrop={handleImageUpload}>
                {({ getRootProps, getInputProps }) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p className="button">Add Picture (optional)</p>
                        </div>
                    </section>
                )}
            </Dropzone>

            <input type="submit" value="Add message" className="button" />
        </form>


        </div >
    )
}
export default MessageForm


