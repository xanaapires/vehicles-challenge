import { renderHook, act } from "@testing-library/react-hooks";
import { useVehicles } from "./useVehicles";
import useVehiclesStore from "../store/useVehiclesStore";
import { resetStore } from "../store/useVehiclesStore.test";
import { vehiclesData } from "../assets/vehiclesData";

describe("useVehicles Hook", () => {
  beforeEach(() => {
    resetStore();
  });

  test("Handles initial state", () => {
    const { result } = renderHook(() => useVehicles());

    expect(result.current.filters).toEqual({
      make: "",
      model: "",
      startBid: "",
      endBid: "",
      favouritesOnly: false,
    });

    expect(result.current.vehiclesToShow.length).toBe(10);
    expect(result.current.filteredVehicles.length).toBeGreaterThan(0);
  });

  test("Handles applyFilter correctly", () => {
    const { result } = renderHook(() => useVehicles());

    act(() => {
      result.current.applyFilter("make", "Toyota");
    });

    expect(result.current.filters.make).toBe("Toyota");
    expect(useVehiclesStore.getState().currentPage).toBe(1);
    expect(result.current.filteredVehicles.length).toBe(
      vehiclesData.filter((v) => v.make.includes("Toyota"))?.length,
    );
    expect(result.current.filteredVehicles.every((v) => v.make.includes("Toyota"))).toBe(true);
  });

  test("Handles toggleFavourite correctly", () => {
    const { result } = renderHook(() => useVehicles());

    const vehicleId = result.current.vehiclesToShow[0].id;
    const isFavourite = result.current.vehiclesToShow[0].favourite || false;

    act(() => {
      result.current.toggleFavourite(vehicleId);
    });

    const updatedVehicle = useVehiclesStore.getState().data.find((v) => v.id === vehicleId);

    expect(updatedVehicle?.favourite).toBe(!isFavourite);
  });

  test("Handles getVehicleById correctly", () => {
    const { result } = renderHook(() => useVehicles());

    const vehicleToConsider = result.current.vehiclesToShow[0];

    const vehicleId = vehicleToConsider.id;

    act(() => {
      result.current.getVehicleById(`${vehicleId}`);
    });

    expect(result.current.getVehicleById(`${vehicleId}`)).toBe(vehicleToConsider);
  });
});
