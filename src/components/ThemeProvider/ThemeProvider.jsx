import React from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { fontWeight, themeConfig, defaultColors, ThemeColor } from "./themeConfigs";

const addCssVars = () => {
  Object.keys(fontWeight).forEach((key) => {
    document.documentElement.style.setProperty(`--weight-${key}`, fontWeight[key]);
  });
};

const ThemeProvider = ({ children }) => {
  const pallete = defaultColors;

  addCssVars(pallete);

  const activeTheme = createTheme(themeConfig(pallete));

  return (
    <MuiThemeProvider theme={activeTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
