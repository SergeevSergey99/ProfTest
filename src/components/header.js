import React from "react";
import logo1 from "../лого_синий.png";
import logo2 from "../LOGO.png";


class Header extends React.Component {
    render() {
        return (
            <div className="header">

                <a href="#/">
                    <img className="mini_logo1" src={logo1} alt={"logo"}/>
                </a>

                <a href="http://ctt-adm.ru/" target="_blank" rel="noopener noreferrer">
                    <img className="mini_logo2" src={logo2} alt={"logo"}/>
                </a>
                <div id="Rectangle-1"></div>
                <div id="Ellipse-1"></div>
            </div>
        );
    }
}

export default Header;