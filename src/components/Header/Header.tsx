import React from "react";
import { Box } from "@mui/material";
import icon from "../../assets/icon.jpeg";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

const Header = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(ROUTES.LISTING);
  };

  return (
    <Box display="flex" alignItems="center" padding="24px">
      <img
        data-testid="cba-logo"
        src={icon}
        alt="Icon"
        style={{ height: "50px", cursor: "pointer" }}
        onClick={handleGoHome}
      />
    </Box>
  );
};

export default Header;
