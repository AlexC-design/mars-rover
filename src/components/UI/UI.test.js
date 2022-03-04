import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import UI from "./UI";

describe("<UI />", () => {
  it("renders command directions", () => {
    const { getByTestId } = render(
      <UI commandQueue={["MOVE_FORWARD", "ROTATE_LEFT", "ROTATE_RIGHT"]} />
    );
    const commandList = getByTestId("commandList");
    expect([...commandList.childNodes]).toHaveLength(3);
  });

  it("disables button when rover is moving", () => {
    const { getByText } = render(<UI roverMoving={true} />);
    const startButton = getByText(/start/i);
    expect(startButton).toHaveProperty("disabled", true);
  });

  it("enables button when rover is not moving", () => {
    const { getByText } = render(<UI roverMoving={false} />);
    const startButton = getByText(/start/i);
    expect(startButton).toHaveProperty("disabled", false);
  });

  it("calls the startRover function when clicking start", async () => {
    await act(async () => {
      const startRover = jest.fn();
      const { getByText } = render(<UI startRover={startRover} />);
      const startButton = getByText(/start/i);
      await fireEvent.click(startButton);
      expect(startRover).toHaveBeenCalledTimes(1);
    });
  });
});
