import React from "react";

function Header(props) {
    const { src, heading, message, title} = props;
    return (
        <header className="header" style={{ backgroundImage: `url(${src})` }}>
            <h1 className="header__heading">{heading}</h1>
            <h1 className="header__message">{message}</h1>
            <h1 className="header__title">{title}</h1>
    </header>
    ) 
}

export default Header;
