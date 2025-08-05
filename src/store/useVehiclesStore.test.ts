import { act } from "@testing-library/react";
import useVehiclesStore from "./useVehiclesStore";

export const resetStore = () => {
  const { setFilters, setCurrentPage } = useVehiclesStore.getState();
  setFilters({
    make: "",
    model: "",
    startBid: "",
    endBid: "",
    favouritesOnly: false,
  });
  setCurrentPage(1);
};

beforeEach(() => {
  resetStore();
});

describe("useVehiclesStore store", () => {
  test("Initial state is set correctly", () => {
    const state = useVehiclesStore.getState();
    expect(state.currentPage).toBe(1);
    expect(state.filters).toEqual({
      make: "",
      model: "",
      startBid: "",
      endBid: "",
      favouritesOnly: false,
    });
    expect(state.data.length).toBeGreaterThan(0);
    expect(state.data[0].startingBid).toBeLessThanOrEqual(state.data[1].startingBid);
  });

  test("Applies filters correctly", () => {
    const newFilters = {
      make: "BMW",
      model: "320",
      startBid: "1000",
      endBid: "3000",
      favouritesOnly: true,
    };

    act(() => {
      useVehiclesStore.getState().setFilters(newFilters);
    });

    expect(useVehiclesStore.getState().filters).toEqual(newFilters);
  });

  test("Handles toggleVehicleFavourite correctly", () => {
    const { data, toggleVehicleFavourite } = useVehiclesStore.getState();
    const vehicleId = data[0].id;
    const originalFav = data[0].favourite;

    act(() => {
      toggleVehicleFavourite(vehicleId);
    });

    const updatedVehicle = useVehiclesStore.getState().data.find((v) => v.id === vehicleId);
    expect(updatedVehicle?.favourite).toBe(!originalFav);
  });

  test("Handles error while toggleVehicleFavourite", () => {
    const beforeData = useVehiclesStore.getState().data;

    act(() => {
      useVehiclesStore.getState().toggleVehicleFavourite(-1);
    });

    const afterData = useVehiclesStore.getState().data;
    expect(afterData).toEqual(beforeData);
  });
});
