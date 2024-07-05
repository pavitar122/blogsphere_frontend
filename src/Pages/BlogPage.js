import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import { useParams } from "react-router-dom";
import axios from "axios";


function BlogPage() {
    const [blog, setBlog] = useState([]);
    const params = useParams();

    useEffect(() => {
        async function getBlogs() {
            try {
                const response = await axios.get(`http://13.201.63.75:3001/blog/getBlog/${params.id}`);
                if (response) {
                    setBlog(response.data.blog[0])
                }
            } catch (error) {
                console.error(error);
            }
        }
        getBlogs();
     
    }, [blog, params.id]); 


    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    },[])






    return (
        <div>
            {blog.imageLink === "" ?
             <Header src={"/Images/Header/Index-header.jpg"}  title={blog.title} /> :
             <Header src={blog.imageLink} title={blog.title} />}
           
 
            <section className="section-blogpage">
                <h1  className="section-blogpage__subtitle">{blog.subtitle}</h1>
                <div id="content" className="section-blogpage__content"  dangerouslySetInnerHTML={{ __html: blog.content }}></div>
           
            </section>


        </div>

    );
}

export default BlogPage;
