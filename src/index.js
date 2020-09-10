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
            value: 150,
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
};

function App() {

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }}>
            <div>
                <Particles style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                }} params={particleOpt}/>
            </div>

            <HashRouter>

                <Header/>
                <Main/>
            </HashRouter>
        </div>
    );
}

const rootElement = document.getElementById("root");

ReactDOM.render(<App/>, rootElement);

