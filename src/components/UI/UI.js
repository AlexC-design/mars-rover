import React from "react";
import ui from "../../assets/ui/ui.svg";
import up from "../../assets/ui/up.svg";
import left from "../../assets/ui/left.svg";
import right from "../../assets/ui/right.svg";
import "./scss/ui.css";

const UI = ({ startRover, commandQueue = [], roverMoving }) => {
  const commandToImage = {
    ROTATE_RIGHT: right,
    ROTATE_LEFT: left,
    MOVE_FORWARD: up
  };
  const commandToDirection = {
    ROTATE_RIGHT: "right",
    ROTATE_LEFT: "left",
    MOVE_FORWARD: "up"
  };

  return (
    <div className="ui-container">
      <div className="command-list" data-testid="commandList">
        {commandQueue.map((command, i) => (
          <img
            src={commandToImage[command]}
            alt="arrow"
            key={`arrow-${i}`}
            data-testid={`${commandToDirection[command]}`}
          />
        ))}
      </div>
      <div className="instructions-container">
        <img src={ui} alt="instructions" className="instructions" />
        <button onClick={startRover} disabled={roverMoving}>
          start
        </button>
      </div>
    </div>
  );
};

export default UI;
