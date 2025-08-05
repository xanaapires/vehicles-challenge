import { useCallback, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import useVehiclesStore from "../store/useVehiclesStore";

export const useVehicles = () => {
  const { data, filters, currentPage, setFilters, setCurrentPage, toggleVehicleFavourite } =
    useVehiclesStore(useShallow((state) => state));

  const { favouritesOnly, make, startBid, endBid, model } = filters;

  const filteredVehicles = useMemo(
    () =>
      data.filter((item) => {
        return (
          item.favourite === (favouritesOnly ? favouritesOnly : item.favourite) &&
          item.make.includes(make !== "all" ? make : "") &&
          item.model.includes(model !== "all" ? model : "") &&
          (!!startBid ? item.startingBid > Number(startBid) : true) &&
          (!!endBid ? item.startingBid < Number(endBid) : true)
        );
      }),
    [data, endBid, favouritesOnly, make, model, startBid],
  );

  const vehiclesToShow = useMemo(
    () => filteredVehicles?.slice((currentPage - 1) * 10, currentPage * 10),
    [currentPage, filteredVehicles],
  );

  const applyFilter = useCallback(
    (name: keyof typeof filters, value: string | boolean) => {
      setCurrentPage(1);

      setFilters({
        ...filters,
        [name]: value,
        ...(name === "make" && value === "" && { model: "" }),
        ...(name === "endBid" && value === "" && { endBid: "" }),
        ...(name === "startBid" && value === "" && { startBid: "" }),
      });
    },
    [filters, setCurrentPage, setFilters],
  );

  const availableMakes = useMemo(() => {
    const makesList = new Set(data.map((vehicle) => vehicle.make));

    const sortedMakesList = Array.from(makesList)
      .sort((a, b) => (a > b ? 1 : -1))
      .map((value) => ({ label: value, value }));

    return [{ label: "All", value: "all" }, ...sortedMakesList];
  }, [data]);

  const availableModels = useMemo(() => {
    const modelsList = new Set(data.map((vehicle) => vehicle.model));

    const sortedModelsList = Array.from(modelsList)
      .sort((a, b) => (a > b ? 1 : -1))
      .map((value) => ({ label: value, value }));

    return [{ label: "All", value: "all" }, ...sortedModelsList];
  }, [data]);

  const bidValues = useMemo(() => {
    const maxValue = data.reduce((acc: number, { startingBid }) => {
      acc = startingBid > acc ? startingBid : acc;

      return acc;
    }, 0);

    const intervalsNumber = maxValue / 250;

    const options = new Array(intervalsNumber).fill(0).map((_, index) => {
      const value = `${(index + 1) * 250}`;

      const bidFormatter = new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      });

      return { value, label: bidFormatter.format(parseInt(value, 10)) };
    });

    return [{ label: "Any", value: 0 }, ...options];
  }, [data]);

  const getVehicleById = (id: string) => {
    return data?.find((vehicle) => vehicle.id === Number(id));
  };

  const toggleFavourite = useCallback(
    (id: number) => {
      toggleVehicleFavourite(id);
    },
    [toggleVehicleFavourite],
  );

  return {
    vehiclesToShow,
    filteredVehicles,
    filters,
    applyFilter,
    availableMakes,
    availableModels,
    bidValues,
    getVehicleById,
    toggleFavourite,
  };
};
