import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { generatePath, MemoryRouter } from "react-router-dom";
import VehicleCard from "../VehicleCard";
import { vehiclesData } from "../../../assets/vehiclesData";
import { defaultStateMock } from "../../../utils/hookFixtures";
import { ROUTES } from "../../../utils/routes";

const mockedNavigate = jest.fn();
const mockUseVehicles = jest.fn();
const mockToggleFavourite = jest.fn();

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
      <VehicleCard vehicle={{ ...vehiclesData[0], id: 1 }} />
    </MemoryRouter>,
  );
};

describe("VehicleCard", () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-08-04T00:00:00Z"));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test("Renders VehicleCard correctly", () => {
    mockUseVehicles.mockReturnValue({ ...defaultStateMock });

    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
    expect(screen.getByTestId("vehicle-card")).toBeVisible();
  });

  test("Handles See Details correctly", () => {
    mockUseVehicles.mockReturnValue({ ...defaultStateMock });

    renderComponent();

    expect(screen.getByTestId("vehicle-card")).toBeVisible();
    expect(screen.getByTestId("see-details-button")).toBeVisible();

    fireEvent.click(screen.getByTestId("see-details-button"));

    expect(mockedNavigate).toHaveBeenCalledWith(
      generatePath(ROUTES.VEHICLE_DETAILS, { vehicleId: 1 }),
    );
  });

  test("Handles toogle favourite correctly", () => {
    mockUseVehicles.mockReturnValue({
      ...defaultStateMock,
      toggleFavourite: mockToggleFavourite,
    });

    renderComponent();

    expect(screen.getByTestId("vehicle-card")).toBeVisible();
    expect(screen.getByTestId("favourite-icon")).toBeVisible();

    fireEvent.click(screen.getByTestId("favourite-icon"));
    expect(mockToggleFavourite).toHaveBeenCalled();
  });
});
