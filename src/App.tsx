import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Typography } from "@mui/material";
import { defaultColors } from "./components/ThemeProvider/themeConfigs";

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Typography variant="h1" sx={{ cursor: "inherit", color: defaultColors.primaryDark }}>
          Are you ready?
        </Typography>
        <Typography color="neutralGrey" variant="body3">
          Here we goooo
        </Typography>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
