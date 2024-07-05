import React from "react";
import { Link, useNavigate } from "react-router-dom";


function Navbar() {
  const auth = localStorage.getItem("user")
  const navigate = useNavigate();

  function logout() {
    localStorage.clear()
    navigate("/")
    window.location.reload();
  }

  return (
    <nav class="navbar">
      <div class="navbar__container">
        <Link  to="/" class="navbar__logo">BlogSphere</Link>

        <ul class="navbar__links">
        
          {auth ? (
            <>
             <li><Link  to="/add_blog">Add Blog</Link></li>  
            <li><Link to="/user_blogs">Your blogs</Link></li>
            <li><Link to="/" onClick={logout}>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
          
        </ul>
      </div>
    </nav>
  )
}

export default Navbar;