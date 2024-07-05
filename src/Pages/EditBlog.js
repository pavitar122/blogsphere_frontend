import React, { useState, useRef, useEffect } from "react";
import Header from "../Components/Header"
import JoditEditor from 'jodit-react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditBlog() {
    const auth = JSON.parse(localStorage.getItem("user"));
    const editor = useRef(null);
    const params = useParams();
    const navigate = useNavigate();
    const [title, settitle] = useState("");
    const [subtitle, setsubtitle] = useState("");
    const [content, setcontent] = useState("");

    useEffect(() => {
        async function getBlog() {
            const config = {
                headers: {
                    authorization: `Bearer ${auth.token}`
                }
            }
            try {
                const response = await axios.get(`https://blogsphere-backend.vercel.app/blog/getBlog/${params.id}`, config);
                if (response.data) {
                    const { title, subtitle, content } = response.data.blog[0];
                    settitle(title);
                    setsubtitle(subtitle);
                    setcontent(content);
                }
                console.log(response.data.blog[0])
            } catch (error) {
                console.log(error);
            }
        }
        getBlog();
    }, [auth.token, params.id]);

  

    async function handleSubmit(event) {
        const config = {
            headers: {
                authorization: `Bearer ${auth.token}`
            }
        }
        try {
            event.preventDefault();
            const data = {title, subtitle, content}
            const resopnse = await axios.put(`https://blogsphere-backend.vercel.app/blog/editBlog/${params.id}`, data, config);
            if(resopnse){
                navigate("/user_blogs")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

        <Header src={"/Images/Header/Index-header.jpg"} heading={auth.name} message={"Edit your Blog."} />

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


                <div type="submit" className="add-blog__form__button" onClick={handleSubmit}>Edit Blog</div>


            </form>

        </section>
    </>
    )
}

export default EditBlog;
