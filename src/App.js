import React, { useEffect, useState } from "react";
import Grid from "./components/Grid/Grid";
import Rover from "./components/Rover/Rover";
import UI from "./components/UI/UI";
import "./scss/app.css";

function App() {
  const [currentDirection, setCurrentDirection] = useState("NORTH");
  const [rotationAmount, setRotationAmount] = useState(0);
  const [currentTile, setcurrentTile] = useState({ row: 9, col: 4 });
  const [commandQueue, setCommandQueue] = useState([]);
  const [roverMoving, setRoverMoving] = useState(false);

  const rotate = (rotationDirection) => {
    const directionChanges = {
      ROTATE_RIGHT: {
        NORTH: "EAST",
        EAST: "SOUTH",
        SOUTH: "WEST",
        WEST: "NORTH"
      },
      ROTATE_LEFT: {
        NORTH: "WEST",
        EAST: "NORTH",
        SOUTH: "EAST",
        WEST: "SOUTH"
      }
    };

    switch (rotationDirection) {
      case "ROTATE_LEFT":
        setRotationAmount(rotationAmount - 90);
        break;
      case "ROTATE_RIGHT":
        setRotationAmount(rotationAmount + 90);
        break;
    }

    setCurrentDirection(directionChanges[rotationDirection][currentDirection]);
  };

  const forward = () => {
    const gridsize = 10;

    let newTile = { ...currentTile };

    switch (currentDirection) {
      case "NORTH":
        newTile.row > 0 && newTile.row--;
        break;
      case "EAST":
        newTile.col < gridsize - 1 && newTile.col++;
        break;
      case "SOUTH":
        newTile.row < gridsize - 1 && newTile.row++;
        break;
      case "WEST":
        newTile.col > 0 && newTile.col--;
        break;
      default:
        break;
    }

    setcurrentTile(newTile);
  };

  const executeCommand = (command) => {
    switch (command) {
      case "MOVE_FORWARD":
        forward();
        break;
      case "ROTATE_LEFT":
        rotate("ROTATE_LEFT");
        break;
      case "ROTATE_RIGHT":
        rotate("ROTATE_RIGHT");
        break;
    }
  };

  const startRover = () => {
    setRoverMoving(true);
    executeCommand(commandQueue[0]);

    const intervalId = setInterval(() => {
      setCommandQueue((commandQueue) => {
        if (commandQueue.length === 0) {
          clearInterval(intervalId);
          setRoverMoving(false);
        }

        return commandQueue.slice(1);
      });
    }, 400);
  };

  //moving rover
  useEffect(() => {
    if (roverMoving) {
      executeCommand(commandQueue[0]);
    }
  }, [commandQueue]);


  //building command list
  const addToCommandQueue = (e) => {
    if (["R", "ARROWRIGHT"].includes(e.key.toUpperCase())) {
      setCommandQueue((commandQueue) => commandQueue.concat("ROTATE_RIGHT"));
    }
    if (["L", "ARROWLEFT"].includes(e.key.toUpperCase())) {
      setCommandQueue((commandQueue) => commandQueue.concat("ROTATE_LEFT"));
    }
    if (["F", "ARROWUP"].includes(e.key.toUpperCase())) {
      setCommandQueue((commandQueue) => commandQueue.concat("MOVE_FORWARD"));
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", addToCommandQueue);

    return () => {
      window.removeEventListener("keydown", addToCommandQueue);
    };
  }, []);

  return (
    <div className="main-screen">
      <div className="stage-container" data-testid="stageContainer">
        <Rover
          rotationAmount={rotationAmount}
          currentTile={currentTile}
          roverMoving={roverMoving}
        />
        <Grid />
        <UI startRover={startRover} commandQueue={commandQueue} roverMoving={roverMoving} />
      </div>
    </div>
  );
}

export default App;
