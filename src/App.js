import React from "react";
import Timer from "./components/Timer/Timer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Progressive Pomodoro</h1>
        <Timer />
      </header>
    </div>
  );
}

export default App;
