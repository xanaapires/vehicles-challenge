import React from "react";
import { Box, Pagination, Switch, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useVehicles } from "../../hooks/useVehicles";
import useVehiclesStore from "../../store/useVehiclesStore";
import { useShallow } from "zustand/react/shallow";
import { VehicleCard } from "../../components/VehicleCard";
import { Dropdown } from "../../components/Dropdown";
import { defaultColors } from "../../components/ThemeProvider/themeConfigs";

const VehiclesList = () => {
  const {
    vehiclesToShow,
    filteredVehicles,
    filters,
    applyFilter,
    availableMakes,
    availableModels,
    bidValues,
  } = useVehicles();
  const { currentPage, setCurrentPage } = useVehiclesStore(useShallow((state) => state));

  // @ts-ignore
  const handlePagination = (_, page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Grid container spacing="16px">
      <Grid item xs={12} sm={6} md={3}>
        <Dropdown
          label="Make"
          options={availableMakes}
          onChange={(value) => applyFilter?.("make", value)}
          value={filters?.make}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Dropdown
          label="Model"
          options={availableModels}
          onChange={(value) => applyFilter?.("model", value)}
          value={filters?.model}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Dropdown
          label="Bid from"
          options={bidValues}
          onChange={(value) => applyFilter?.("startBid", value)}
          value={filters?.startBid}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Dropdown
          label="Bid to"
          options={bidValues}
          onChange={(value) => applyFilter?.("endBid", value)}
          value={filters?.endBid}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12}>
        <Box display="flex" gap="4px" alignItems="center">
          <Switch onChange={(_, value) => applyFilter?.("favouritesOnly", value)} />
          <Typography variant="body3" color={defaultColors.neutralDarkGrey}>
            Show only favourites
          </Typography>
        </Box>
      </Grid>
      {vehiclesToShow?.map((vehicle) => (
        <Grid item xs={12} sm={6} md={6} key={vehicle.id}>
          <VehicleCard vehicle={vehicle} />
        </Grid>
      ))}
      {!vehiclesToShow?.length && (
        <Grid item xs={12} sm={12} md={12} textAlign="center" data-testid="empty-results">
          <Typography variant="body1" color={defaultColors.primaryMain}>
            No results to present. Please check you search criteria.
          </Typography>
        </Grid>
      )}
      {!!vehiclesToShow?.length && (
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          display="flex"
          alignItems="center"
          justifyContent="center">
          <Pagination
            page={currentPage}
            count={Math.ceil(filteredVehicles?.length / 10)}
            color="primary"
            onChange={handlePagination}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default VehiclesList;
