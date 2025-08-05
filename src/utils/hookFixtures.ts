import { vehiclesData } from "../assets/vehiclesData";

export const defaultStateMock = {
  vehiclesToShow: vehiclesData,
  filteredVehicles: vehiclesData,
  filters: {
    make: "",
    model: "",
    startBid: "",
    endBid: "",
    favouritesOnly: false,
  },
  applyFilter: () => {},
  availableMakes: [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Audi",
      value: "Audi",
    },
    {
      label: "BMW",
      value: "BMW",
    },
    {
      label: "Citroen",
      value: "Citroen",
    },
    {
      label: "Ford",
      value: "Ford",
    },
    {
      label: "Mercedes-Benz",
      value: "Mercedes-Benz",
    },
    {
      label: "Toyota",
      value: "Toyota",
    },
    {
      label: "Volkswagen",
      value: "Volkswagen",
    },
    {
      label: "Volvo",
      value: "Volvo",
    },
  ],
  availableModels: [],
  bidValues: [],
  getVehicleById: () => {},
  toggleFavourite: () => {},
};
