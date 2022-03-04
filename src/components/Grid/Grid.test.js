import { render } from "@testing-library/react";
import Grid from "./Grid";

describe("<Grid />", () => {
  it("renders a 10x10 grid", () => {
    const { getByTestId } = render(<Grid />);
    const gridContainer = getByTestId("gridContainer");
    expect([...gridContainer.childNodes]).toHaveLength(10);
    [...gridContainer.childNodes].forEach((row) => {
      expect([...row.childNodes]).toHaveLength(10);
    });
  });
});
