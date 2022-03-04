import React from "react";
import wheels from "../../assets/rover/wheels.svg";
import body from "../../assets/rover/body.svg";
import camera from "../../assets/rover/camera.svg";
import "./scss/rover.css";

const Rover = ({ rotationAmount, currentTile, roverMoving }) => {
  const roverContainerStyle = {
    top: `${currentTile.row * 10}%`,
    left: `${currentTile.col * 10}%`
  };
  const roverPartsStyle = { transform: `rotate(${rotationAmount}deg)` };

  return (
    <div className="rover-container" style={roverContainerStyle} data-testid="roverContainer">
      <div className="rover-parts" style={roverPartsStyle} data-testid="roverParts">
        <img src={wheels} className={`wheels ${roverMoving && "moving"}`} alt="wheels" />
        <img src={body} className="body" alt="body" />
        <img src={camera} className="camera" alt="camera" />
      </div>
    </div>
  );
};

export default Rover;
