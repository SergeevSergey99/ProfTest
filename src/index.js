import React from "react";
import ReactDOM from "react-dom";

import Quiz from "./components/Quiz";
import Quiz2 from "./components/Quiz2";
import Header from "./components/header";
import "./styles.css";
import Particles from 'react-particles-js';

const particleOpt = {
    particles:{
        number:{
            value: 250,
            density: {
                enable: true,
                value_area: 1000
            }
        },
        size: {
            value: 3
        }

    }/*,
    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            }
        }
    }*/
}

function App() {

    return (
        <div>

            <Particles  params={particleOpt}/>
            <Header/>
            <Quiz/>
        </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);

