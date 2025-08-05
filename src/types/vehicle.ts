export type VehicleDetails = {
  specification: {
    vehicleType: string;
    colour: string;
    fuel: string;
    transmission: string;
    numberOfDoors: number;
    co2Emissions: string;
    noxEmissions: number;
    numberOfKeys: number;
  };
  ownership: {
    logBook: string;
    numberOfOwners: number;
    dateOfRegistration: string;
  };
  equipment: string[];
};

export type Vehicle = {
  make: string;
  model: string;
  engineSize: string;
  fuel: string;
  year: number;
  mileage: number;
  auctionDateTime: string;
  startingBid: number;
  favourite?: boolean;
  id: number;
  details?: VehicleDetails;
};

export type VehicleFilter = {
  make: string;
  model: string;
  startBid: string;
  endBid: string;
  favouritesOnly: boolean;
};
