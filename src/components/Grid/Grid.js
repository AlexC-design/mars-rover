import React from "react";
import "./scss/grid.css";

const Grid = () => {
  const gridMatrix = [...Array(10)].map((_, row) => [...Array(10)].map((_, col) => ({ row, col })));

  return (
    <div className="grid-container" data-testid="gridContainer">
      {gridMatrix.map((row, rowNumber) => {
        return (
          <div className="row" key={rowNumber}>
            {row.map((tile) => {
              return <div className="tile" key={`${tile.row + tile.col}`}></div>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
