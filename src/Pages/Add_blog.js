import React, { useEffect, useRef, useState } from "react";
import JoditEditor from 'jodit-react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Header from "../Components/Header";

function AddBlog() {
    const auth = JSON.parse(localStorage.getItem("user"));
    const editor = useRef(null);
    const [message, setmessage] = useState("Upload Blog Image")
    const [title, settitle] = useState("")
    const [subtitle, setsubtitle] = useState("")
    const [content, setcontent] = useState("")
    const [imageLink, setLink] = useState("")

    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        const config = {
            headers: {
                authorization: `Bearer ${auth.token}`
            }
        }
        const data = { title, subtitle, content, imageLink };
        try {
            const response = await axios.post("https://blogsphere-backend.vercel.app/blog/addBlog", data, config);
            if (response.status === 200) {
                navigate("/");
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, []);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        handleImageUpload(file);
    }

    const handleImageUpload = async (photo) => {
        if (photo === undefined) {
            alert("file is unindentified")
            return;
        }
        setmessage("Uploading")

        const formData = new FormData();
        formData.append('file', photo);
        formData.append('upload_preset', 'chat_app');

        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dflkzguu6/image/upload',
                formData
            );
            console.log(response.data);
            setLink(response.data.url)
            setmessage("File Uploaded")
        } catch (error) {
            console.error('Error uploading the image', error);
        }
    };


    return (
        <>
            <Header src={"/Images/Header/edit-header.jpg"} heading={auth.name} message={"Add your Blog."} />

            <section className="add-blog">

                <form className="add-blog__form" onSubmit={handleSubmit} encType="multipart/form-data" >

                    <div className="add-blog__form__group">

                        <input className="add-blog__form__input" type="text"

                            value={title}
                            onChange={(e) => settitle(e.target.value)}
                            placeholder="Title"
                            name="title"
                            required />
                    </div>

                    <div className="add-blog__form__group">
                        <input className="add-blog__form__input" type="text"

                            value={subtitle}

                            onChange={(e) => setsubtitle(e.target.value)}
                            placeholder="Subtitle"
                            name="subtitle"
                            required />
                    </div>

                    <div className="add-blog__form__group">
                        <JoditEditor
                        className="add-blog__form__content"
                            ref={editor}
                            value={content}
                            onChange={newContent => setcontent(newContent)}
                            name="content" />
                    </div>

                    <div className="add-blog__form__group">
                        <label className={message === "Uploading" ? "add-blog__form__file__label" + " uploading" :  "add-blog__form__file__label"} for="photo">{message}</label>
                        <input className="add-blog__form__file" id="photo" type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                            name="photo"
                        />
                    </div>

                    <div type="submit" className="add-blog__form__button" onClick={handleSubmit}>Add Blog</div>


                </form>

            </section>
        </>
    )

}

export default AddBlog;


