import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router-dom";
import VehicleDetails from "../VehicleDetails";
import { vehiclesData } from "../../../assets/vehiclesData";
import { defaultStateMock } from "../../../utils/hookFixtures";
import { ROUTES } from "../../../utils/routes";

const mockedNavigate = jest.fn();
const mockUseVehicles = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
  useParams: jest.fn(),
}));

jest.mock("../../../hooks/useVehicles", () => ({
  useVehicles: () => mockUseVehicles(),
}));

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <VehicleDetails />
    </MemoryRouter>,
  );
};

describe("VehicleDetails", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-08-04T00:00:00Z"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("Renders VehicleDetails correctly", () => {
    mockUseVehicles.mockReturnValue({ ...defaultStateMock, getVehicleById: () => vehiclesData[1] });
    (useParams as jest.Mock).mockReturnValue({ vehicleId: "1" });

    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
    expect(screen.getByTestId("vehicle-main-info")).toBeVisible();
    expect(screen.queryAllByTestId("accordion")).toHaveLength(3);
  });

  test("Handles unexpected error correctly", () => {
    mockUseVehicles.mockReturnValue({ ...defaultStateMock, getVehicleById: () => null });
    (useParams as jest.Mock).mockReturnValue({ vehicleId: "" });

    renderComponent();

    expect(screen.getByTestId("error-container")).toBeVisible();
  });

  test("Handles back to listing page", () => {
    mockUseVehicles.mockReturnValue({ ...defaultStateMock, getVehicleById: () => vehiclesData[1] });
    (useParams as jest.Mock).mockReturnValue({ vehicleId: "1" });

    renderComponent();

    expect(screen.getByTestId("vehicle-main-info")).toBeVisible();
    expect(screen.getByTestId("back-button")).toBeVisible();

    fireEvent.click(screen.getByTestId("back-button"));

    expect(mockedNavigate).toHaveBeenCalledWith(ROUTES.LISTING);
  });
});
