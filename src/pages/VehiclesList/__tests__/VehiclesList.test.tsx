import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import VehiclesList from "../VehiclesList";
import { defaultStateMock } from "../../../utils/hookFixtures";

const mockedNavigate = jest.fn();
const mockUseVehicles = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

jest.mock("../../../hooks/useVehicles", () => ({
  useVehicles: () => mockUseVehicles(),
}));

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <VehiclesList />
    </MemoryRouter>,
  );
};

describe("VehiclesList", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-08-04T00:00:00Z"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("Renders VehiclesList with results", () => {
    mockUseVehicles.mockReturnValue(defaultStateMock);
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  test("Renders VehiclesList without any vehicle", () => {
    mockUseVehicles.mockReturnValue({
      vehiclesToShow: [],
    });

    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
    expect(screen.getByTestId("empty-results")).toBeVisible();
  });
});
