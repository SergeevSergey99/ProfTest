import React from "react";
import ReactDOM from "react-dom";

import Quiz from "./components/Quiz";

function App() {
  return (
    <div className="App">
      <p>Header</p>
      <Quiz />
      <p>Footer</p>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
