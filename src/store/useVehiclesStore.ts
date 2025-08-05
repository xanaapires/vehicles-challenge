import { Vehicle, VehicleFilter } from "../types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { vehiclesData } from "../assets/vehiclesData";

export type OrderBy = "make" | "startingBid" | "mileage" | "auctionDate";

type VehiclesStoreType = {
  data: Vehicle[];
  filters: VehicleFilter;
  currentPage: number;
  orderBy: OrderBy;
  setCurrentPage: (page: number) => void;
  setFilters: (filters: VehicleFilter) => void;
  toggleVehicleFavourite: (id: number) => void;
  setOrderBy: (order: OrderBy) => void;
};

const sortData = (data: Vehicle[], orderBy: OrderBy): Vehicle[] => {
  return [...data].sort((a, b) => {
    if (orderBy === "make") {
      return a.make.localeCompare(b.make);
    }
    if (orderBy === "startingBid") {
      return a.startingBid - b.startingBid;
    }
    if (orderBy === "mileage") {
      return a.mileage - b.mileage;
    }
    if (orderBy === "auctionDate") {
      return new Date(a.auctionDateTime).getTime() - new Date(b.auctionDateTime).getTime();
    }

    return 0;
  });
};

const useVehiclesStore = create<VehiclesStoreType>()(
  devtools(
    (set, get) => {
      const initialData = vehiclesData.map((vehicle, index) => ({ ...vehicle, id: index }));

      return {
        data: sortData(initialData, "startingBid"),

        filters: {
          make: "all",
          model: "all",
          startBid: "",
          endBid: "",
          favouritesOnly: false,
        },
        currentPage: 1,
        orderBy: "startingBid",
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

        setOrderBy: (orderBy) => {
          const sortedData = sortData(get().data, orderBy);
          set({ data: sortedData, orderBy });
        },
      };
    },
    { name: "VehiclesStore" },
  ),
);

export default useVehiclesStore;
