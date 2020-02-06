import React from "react";
import ReactDOM from "react-dom";

import Quiz from "./components/Quiz";
import Header from "./components/header";
import "./styles.css";

function App() {
  return (
    <div className="Desktop-1">
        <Header />
        <Quiz />
      <p>Footer</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
