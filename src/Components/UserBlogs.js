import React from 'react'
import { Link } from "react-router-dom";

const UserBlogs = ({ blogLink, title, subtitle, author, date , deleteFunction, editFunction }) => {
    return (
        <div>
            <div className="user-blog">
                <Link className="user-blog__link" to={blogLink}>
                    <h1 className="user-blog__title">{title}</h1>
                    <h2 className="user-blog__subtitle">{subtitle}</h2>
                </Link>
                <h2 className="user-blog__detail">Posted by {author} on {date}</h2>

                <div className='user-blog__icons'>
                <i className="user-blog__delete bi bi-trash" onClick={deleteFunction}></i>
                <i className=" user-blog__edit bi bi-pen" onClick={editFunction}></i>
                </div>
              
            </div>
        </div>
    )
}

export default UserBlogs