import { Vehicle, VehicleFilter } from "../types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { vehiclesData } from "../assets/vehiclesData";

type VehiclesStoreType = {
  data: Vehicle[];
  filters: VehicleFilter;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setFilters: (filters: VehicleFilter) => void;
  toggleVehicleFavourite: (id: number) => void;
};

const useVehiclesStore = create<VehiclesStoreType>()(
  devtools(
    (set) => ({
      data: vehiclesData
        .sort((a, b) => (a.startingBid > b.startingBid ? 1 : -1))
        .map((vehicle, index) => ({ ...vehicle, id: index })),
      filters: {
        make: "all",
        model: "all",
        startBid: "",
        endBid: "",
        favouritesOnly: false,
      },
      currentPage: 1,
      setCurrentPage: (currentPage) => set({ currentPage }),
      setFilters: (filters: VehicleFilter) => set(() => ({ filters })),
      toggleVehicleFavourite: (id: number) =>
        set((state) => {
          const vehicleToUpdate = state.data.find((vehicle) => vehicle.id === Number(id));
          const index = state.data.findIndex((item) => item.id === vehicleToUpdate?.id);

          if (!vehicleToUpdate) {
            return { data: state.data };
          }

          return {
            data: [
              ...state.data.slice(0, index),
              { ...vehicleToUpdate, favourite: !vehicleToUpdate?.favourite },
              ...state.data.slice(index + 1),
            ],
          };
        }),
    }),
    { name: "VehiclesStore" },
  ),
);

export default useVehiclesStore;
