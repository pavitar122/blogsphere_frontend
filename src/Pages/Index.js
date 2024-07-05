import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import axios from "axios";
import IndexBlog from "../Components/IndexBlog";

function Index() {
    const auth = JSON.parse(localStorage.getItem("user"));
    const [blogs, setBlogs] = useState([]);
    const [visibleBlogs, setVisibleBlogs] = useState(0);

    useEffect(() => {
        async function getBlogs() {
            try {
                const response = await axios.get("https://blogsphere-backend.vercel.app/blog/fetchAllBlogs");
                if (response.status === 200) {
                    setBlogs(response.data.allblogs);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getBlogs();
    }, []);

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

    return (
        <>
            <Header src={"/Images/Header/Index-header.jpg"} heading={"BlogSphere"}  message={auth ? "" : "Login to add your own blogs"} />
            <section className={"index-blogs"}>
                {blogs.slice().reverse().slice(visibleBlogs, visibleBlogs + 4).map((blog, index) => (
                    <IndexBlog
                        key={index}
                        blogLink={`blog/${blog._id}`}
                        title={blog.title.length <= 50 ? blog.title : blog.title.slice(0, 50) + "..."}
                        subtitle={blog.subtitle.length <= 150 ? blog.subtitle : blog.subtitle.slice(0, 150) + " ..."}
                        author={blog.author.name}
                        date={blog.updatedAt.substring(0, 10)}
                    />
                ))}
            </section>
            <div className="index-buttons">
                <div className="index-buttons__btn" onClick={showPreviousBlogs} style={{ visibility: visibleBlogs === 0 ? 'hidden' : 'visible' }} disabled={visibleBlogs === 0}>Previous</div>
                <div className="index-buttons__btn" onClick={showNextBlogs} style={{ visibility: visibleBlogs + 4 >= blogs.length ? 'hidden' : 'visible' }} disabled={visibleBlogs + 4 >= blogs.length}>Next</div>
            </div>
        </>
    );
}

export default Index;
