import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import Particles from 'react-particles-js';
import Header from './components/header';
import Main from './components/Main';
import {HashRouter} from 'react-router-dom';

const particleOpt = {
    particles: {
        number: {
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
        <HashRouter>

            <div className="parts">
                <Particles params={particleOpt}/>
            </div>
            <Header/>
            <Main/>

        </HashRouter>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);

