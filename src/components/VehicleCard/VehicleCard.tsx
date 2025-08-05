import React, { useCallback } from "react";
import { Vehicle } from "../../types";
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import TimerOutlinedIcon from "@mui/icons-material/TimerOutlined";
import { defaultColors, fontWeight } from "../ThemeProvider/themeConfigs";
import emptyPhoto from "../../assets/empty_photo.jpg";
import moment from "moment";
import { getRelativeTime } from "../../utils/dates";
import { generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useVehicles } from "../../hooks/useVehicles";

const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const navigate = useNavigate();
  const { toggleFavourite } = useVehicles();

  const date = moment(vehicle.auctionDateTime, "YYYY/MM/DD HH:mm:ss");
  const formatted = date.format("DD MMM YYYY, HH:mm");

  const timeToAuction = getRelativeTime(new Date(formatted));

  const bidFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  const updateFavourite = useCallback(
    () => toggleFavourite(vehicle.id),
    [toggleFavourite, vehicle.id],
  );

  const handleSeeDetails = () => {
    navigate(generatePath(ROUTES.VEHICLE_DETAILS, { vehicleId: vehicle.id }));
  };

  return (
    <Box
      data-testid="vehicle-card"
      display="flex"
      position="relative"
      padding="16px"
      borderRadius="30px 4px"
      gap="16px"
      sx={{
        backgroundColor: defaultColors.neutralWhite,
        border: "1px solid #f2f2f2",
      }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <img
          src={emptyPhoto}
          alt="Car"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
            objectPosition: "center",
            borderRadius: "12px",
            display: "block",
            opacity: 0.7,
          }}
        />
      </Box>
      <IconButton
        onClick={updateFavourite}
        sx={{
          position: "absolute",
          top: 8,
          right: 8,
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "grey.100",
          },
        }}>
        {vehicle.favourite ? (
          <StarOutlinedIcon data-testid="favourite-icon" color="warning" />
        ) : (
          <StarBorderOutlinedIcon data-testid="not-favourite-icon" />
        )}
      </IconButton>
      <Box display="flex" flexDirection="column" gap="8px" width="100%">
        <Box>
          <Typography variant="h5" color={defaultColors.primaryMain} fontSize="20px">
            {vehicle.make} - {vehicle.model}
          </Typography>
          <Typography
            variant="body1"
            color={defaultColors.neutralDarkGrey}
            sx={{ textTransform: "capitalize" }}>
            {vehicle.fuel} | {vehicle.year} |{" "}
            {new Intl.NumberFormat("pt-PT").format(vehicle.mileage) ?? 0} Miles
          </Typography>
        </Box>
        <Divider />
        <Box display="flex" flexDirection="column" gap="8px">
          <Box>
            <Typography variant="body3" color={defaultColors.neutralDarkGrey}>
              Starting at
            </Typography>
            <Typography
              color={defaultColors.primaryLight}
              variant="body1"
              fontWeight={fontWeight.medium}>
              {bidFormatter.format(vehicle.startingBid)}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            gap="4px"
            justifyContent="space-between">
            <Box display="flex" alignItems="center" gap="4px">
              <TimerOutlinedIcon
                sx={{ width: "16px", heigh: "16px", color: defaultColors.primaryLight }}
              />
              <Typography color={defaultColors.primaryLight} variant="body2">
                {timeToAuction}
              </Typography>
            </Box>
            <Button
              data-testid="see-details-button"
              variant="contained"
              color="primary"
              onClick={handleSeeDetails}
              sx={{
                boxShadow: "none",
                backgroundColor: defaultColors.primaryMain,
                ":hover": {
                  boxShadow: "none",
                },
              }}>
              See details
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VehicleCard;
