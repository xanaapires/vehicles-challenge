import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";
import { MemoryRouter } from "react-router-dom";
import { ROUTES } from "../../../utils/routes";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>,
  );
};

describe("Header", () => {
  test("Renders header correctly with Logo", () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
    expect(screen.getByTestId("cba-logo")).toBeVisible();
    fireEvent.click(screen.getByTestId("cba-logo"));

    expect(mockedNavigate).toHaveBeenCalledWith(ROUTES.LISTING);
  });
});
