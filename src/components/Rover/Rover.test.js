import { render } from "@testing-library/react";
import Rover from "./Rover";

describe("<Rover />", () => {
  it("renders the rover on the correct tile", () => {
    const { getByTestId } = render(<Rover currentTile={{ row: 4, col: 6 }} />);
    const roverContainer = getByTestId("roverContainer");
    expect(roverContainer.style.top).toEqual("40%");
    expect(roverContainer.style.left).toEqual("60%");
  });
  it("renders the rover with the correct rotation", () => {
    const { getByTestId } = render(<Rover currentTile={{ row: 4, col: 6 }} rotationAmount={180} />);
    const roverParts = getByTestId("roverParts");
    expect(roverParts.style.transform).toEqual("rotate(180deg)");
  });
});
