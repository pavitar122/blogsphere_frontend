import React, { useState, useEffect } from "react";

import axios from "axios";
import UserBlogs from "../Components/UserBlogs";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

function UserBlogPage() {
    const auth = JSON.parse(localStorage.getItem("user"));
    const [blogs, setBlogs] = useState([]);
    const [visibleBlogs, setVisibleBlogs] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        async function getBlogs() {
            const config = {
                headers: {
                    authorization: `Bearer ${auth.token}`
                }
            }
            try {
                const response = await axios.get(`https://blogsphere-backend.vercel.app/blog/fetchUserBlogs`, config)
                if (response) {
                    setBlogs(response.data.blogs)
                }
            } catch (error) {
                console.error(error);
            }
        };
        getBlogs();
        
    }, [auth.token])

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [visibleBlogs]);



   

    const showNextBlogs = () => {
        setVisibleBlogs(prevVisibleBlogs => prevVisibleBlogs + 4);

    };

    const showPreviousBlogs = () => {
        setVisibleBlogs(prevVisibleBlogs => Math.max(0, prevVisibleBlogs - 4));

    };

    const deleteBlog = async (id) => {
        const config = {
            headers: {
                authorization: `Bearer ${auth.token}`
            }
        }
        try {
            const response = await axios.delete(`https://blogsphere-backend.vercel.app/blog/deleteBlog/${id}`, config)
            if (response) {
                navigate("/user_blogs")
                const newBlogs = blogs.filter((x)=> x._id !== id)
                setBlogs(newBlogs)
            }
            console.log(id)
        } catch (error) {
            console.error(error);
        }
    }

    return (

        <div>
            <Header src={"/Images/Header/Index-header.jpg"} heading={auth.name} alt={"header"} />


            {blogs.length === 0 ? (
                <div className="user-blogs__empty">You have not added any blogs yet.</div>
            ) : (
                <section className="user-blogs">
                    {blogs.slice().reverse().slice(visibleBlogs, visibleBlogs + 4).map((blog, index) => (

                        <UserBlogs
                            key={index}
                            blogLink={`/blog/${blog._id}`}
                            title={blog.title.length <= 50 ? blog.title : blog.title.slice(0, 50) + " ..."}
                            subtitle={blog.subtitle.length <= 150 ? blog.subtitle: blog.subtitle.slice(0, 150) + " ..."}
                            author={blog.author.name}
                            date={blog.updatedAt.substring(0, 10)}
                            deleteFunction={()=>deleteBlog(blog._id)}
                            editFunction={()=>navigate(`/user_blogs/edit/${blog._id}`)}
                        />
                    ))}
                </section>
            )
            }


            <div className="user-buttons">
                <button className="user-buttons__btn" onClick={showPreviousBlogs} style={{ visibility: visibleBlogs === 0 ? 'hidden' : 'visible' }} disabled={visibleBlogs === 0}>Previous</button>
                <button className="user-buttons__btn" onClick={showNextBlogs} style={{ visibility: visibleBlogs + 4 >= blogs.length ? 'hidden' : 'visible' }} disabled={visibleBlogs + 4 >= blogs.length} >Next</button>
            </div>



        </div >

    );
}

export default UserBlogPage;
