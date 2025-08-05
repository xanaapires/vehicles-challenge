import React, { useMemo } from "react";
import Grid from "@mui/material/Grid";
import { useVehicles } from "../../hooks/useVehicles";
import { useParams } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import emptyPhoto from "../../assets/empty_photo.jpg";
import moment from "moment";
import { getRelativeTime } from "../../utils/dates";
import { useNavigate } from "react-router-dom";
import { defaultColors } from "../../components/ThemeProvider/themeConfigs";
import { Accordion } from "../../components/Accordion";
import { LabelledText } from "../../components/LabelledText";
import { ROUTES } from "../../utils/routes";

const VehicleDetails = () => {
  const navigate = useNavigate();
  const { vehicleId } = useParams();
  const { getVehicleById, toggleFavourite } = useVehicles();

  const handleGoBack = () => {
    navigate(ROUTES.LISTING);
  };

  const vehicle = useMemo(() => {
    if (!vehicleId) {
      return;
    }

    return getVehicleById(vehicleId);
  }, [getVehicleById, vehicleId]);

  const auctionDate = moment(vehicle?.auctionDateTime, "YYYY/MM/DD HH:mm:ss");
  const formatted = auctionDate.format("DD MMM YYYY, HH:mm");

  const timeToAuction = getRelativeTime(new Date(formatted));

  const bidFormatter = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  });

  if (!vehicle) {
    return (
      <Grid container spacing="16px" data-testid="error-container">
        <Grid item xs={12} sm={12} md={12} textAlign="center">
          <Typography variant="body1" color={defaultColors.primaryMain}>
            Something went wrong. Please try again later
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing="16px">
      <Grid item xs={12} sm={12} md={12}>
        <Button
          data-testid="back-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          sx={{ color: defaultColors.neutralDarkerGrey }}
          onClick={handleGoBack}>
          Back to list
        </Button>
      </Grid>
      <Grid item xs={12} sm={12} md={12} data-testid="vehicle-main-info">
        <Box
          display="flex"
          position="relative"
          padding="16px"
          borderRadius="30px 4px"
          gap="16px"
          sx={{
            backgroundColor: defaultColors.neutralWhite,
            border: "1px solid #f2f2f2",
          }}>
          <Grid container spacing="16px">
            <Grid item xs={12} sm={7} md={7} display="flex" flexDirection="column" gap="16px">
              <Box display="flex" justifyContent="center" alignItems="center" padding="0 32px">
                <img
                  src={emptyPhoto}
                  alt="Car"
                  style={{
                    width: "100%",
                    maxWidth: "300px",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "12px",
                    display: "block",
                    opacity: 0.7,
                  }}
                />
              </Box>
              <Box
                display="flex"
                flexWrap="wrap"
                justifyContent="center"
                alignItems="center"
                gap="12px"
                padding="0 32px">
                <img
                  src={emptyPhoto}
                  alt="Car"
                  style={{
                    width: "110px",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "12px",
                    display: "block",
                    opacity: 0.7,
                  }}
                />
                <img
                  src={emptyPhoto}
                  alt="Car"
                  style={{
                    width: "110px",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "12px",
                    display: "block",
                    opacity: 0.7,
                  }}
                />
                <img
                  src={emptyPhoto}
                  alt="Car"
                  style={{
                    width: "110px",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "12px",
                    display: "block",
                    opacity: 0.7,
                  }}
                />
                <img
                  src={emptyPhoto}
                  alt="Car"
                  style={{
                    width: "110px",
                    objectFit: "cover",
                    objectPosition: "center",
                    borderRadius: "12px",
                    display: "block",
                    opacity: 0.7,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={5} md={5}>
              <IconButton
                onClick={() => toggleFavourite(vehicle.id)}
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
                  <StarOutlinedIcon color="warning" />
                ) : (
                  <StarBorderOutlinedIcon />
                )}
              </IconButton>
              <Box display="flex" flexDirection="column" gap="24px">
                <Typography variant="h5" color={defaultColors.primaryMain} fontSize="20px">
                  {vehicle.make} - {vehicle.model}
                </Typography>
                <LabelledText title="Fuel" text={vehicle.fuel} />
                <LabelledText title="Vehicle Year" text={`${vehicle.year}`} />
                <LabelledText
                  title="Vehicle Mileage"
                  text={`${new Intl.NumberFormat("pt-PT").format(vehicle.mileage) ?? 0} Miles`}
                />
                <LabelledText
                  title="Starting Bid"
                  text={bidFormatter.format(vehicle.startingBid)}
                />
                <LabelledText title="Auction Date" text={formatted} moreInfo={timeToAuction} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {}}
                  disabled
                  sx={{
                    boxShadow: "none",
                    backgroundColor: defaultColors.primaryMain,
                    ":hover": {
                      boxShadow: "none",
                    },
                  }}>
                  Bid now
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        data-testid="vehicle-additional-info"
        display="flex"
        flexDirection="column"
        gap="16px">
        {vehicle?.details?.specification && (
          <Accordion
            id={`${vehicle.id}-specification`}
            header={
              <Typography variant="h5" color={defaultColors.primaryLighter}>
                Additional information
              </Typography>
            }>
            <Grid container>
              <Grid item xs={12} sm={4} md={4}>
                <LabelledText
                  title="Vehicle Type"
                  text={vehicle?.details?.specification?.vehicleType}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <LabelledText
                  title="Vehicle Colour"
                  text={vehicle?.details?.specification?.colour}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <LabelledText
                  title="Vehicle Transmission"
                  text={vehicle?.details?.specification?.transmission}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <LabelledText
                  title="No of Doors"
                  text={`${vehicle?.details?.specification?.numberOfDoors}`}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <LabelledText
                  title="No of Keys"
                  text={`${vehicle?.details?.specification?.numberOfKeys}`}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <LabelledText
                  title="CO2 Emissions"
                  text={vehicle?.details?.specification?.co2Emissions}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <LabelledText
                  title="NOX Emissions"
                  text={`${vehicle?.details?.specification?.noxEmissions}`}
                />
              </Grid>
            </Grid>
          </Accordion>
        )}
        {vehicle?.details?.ownership && (
          <Accordion
            id={`${vehicle.id}-ownership`}
            header={
              <Typography variant="h5" color={defaultColors.primaryLighter}>
                Ownership information
              </Typography>
            }>
            <Grid container>
              <Grid item xs={12} sm={4} md={4}>
                <LabelledText title="Logbook" text={vehicle?.details?.ownership?.logBook} />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <LabelledText
                  title="No of Owners"
                  text={`${vehicle?.details?.ownership?.numberOfOwners}`}
                />
              </Grid>
              <Grid item xs={12} sm={4} md={4}>
                <LabelledText
                  title="Date of Registration"
                  text={moment(vehicle?.details?.ownership?.dateOfRegistration)?.format(
                    "DD MMM YYYY, HH:mm",
                  )}
                />
              </Grid>
            </Grid>
          </Accordion>
        )}
        {vehicle?.details?.equipment?.length && (
          <Accordion
            id={`${vehicle.id}-equipment`}
            header={
              <Typography variant="h5" color={defaultColors.primaryLighter}>
                Equipment information
              </Typography>
            }>
            <Box display="flex" flexDirection="column" gap="12px">
              {vehicle.details.equipment.map((item) => (
                <Typography
                  variant="body1"
                  color={defaultColors.neutralDarkGrey}
                  sx={{ textTransform: "capitalize" }}>
                  {`• ${item};`}
                </Typography>
              ))}
            </Box>
          </Accordion>
        )}
      </Grid>
    </Grid>
  );
};

export default VehicleDetails;
