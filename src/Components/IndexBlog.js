import React from "react";
import { Link } from "react-router-dom";


function IndexBlog(props) {
    const { title, subtitle , blogLink, author, date } = props;

    return (
        <div className="blog">
            <Link className="blog__link" to={blogLink}>
                <h1 className="blog__title">{title}</h1>
                <h2 className="blog__subtitle">{subtitle}</h2>
            </Link>
            <h2 className="blog__detail">Posted by {author} on {date}</h2>
        </div>
    );
}


export default IndexBlog;

