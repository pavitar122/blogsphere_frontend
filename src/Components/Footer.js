import React from "react";

function Footer() {
  const d = new Date();
  const year = d.getFullYear();

  
    return <footer className="section-footer">
  <div class="section-footer__container">
    <p>&copy; {year} BlogSphere. All rights reserved.</p>
  </div>
    </footer>
}


export default Footer;