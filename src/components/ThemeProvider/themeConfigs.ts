import { createTheme, ThemeOptions } from "@mui/material/";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    body3: React.CSSProperties;
    subtitle3: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body3?: React.CSSProperties;
    subtitle3?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body3: true;
    subtitle3: true;
  }
}

export type ThemeColor = {
  primaryMain: string;
  primaryLight: string;
  primaryLighter: string;
  primaryDark: string;
  primaryDarker: string;
  secondaryMain: string;
  secondaryLight: string;
  secondaryLighter: string;
  secondaryVeryLighter: string;
  secondaryDark: string;
  secondaryDarker: string;
  neutralWhite: string;
  neutralLighterGrey: string;
  neutralLightGrey: string;
  neutralGrey: string;
  neutralDarkGrey: string;
  neutralDarkerGrey: string;
  neutralBlack: string;
  alertWarning: string;
  alertError: string;
  alertValid: string;
  alertInformation: string;
};

export const defaultColors: ThemeColor = {
  primaryMain: "#003366",
  primaryLight: "#335588",
  primaryLighter: "#6677AA",
  primaryDark: "#002244",
  primaryDarker: "#001122",
  secondaryMain: "#CC0000",
  secondaryLight: "#E06666",
  secondaryLighter: "#F29999",
  secondaryVeryLighter: "#FDECEF",
  secondaryDark: "#990000",
  secondaryDarker: "#660000",
  neutralWhite: "#FFFFFF",
  neutralLighterGrey: "#F6F7F8",
  neutralLightGrey: "#E0E0E0",
  neutralGrey: "#9E9E9E",
  neutralDarkGrey: "#5A5A5A",
  neutralDarkerGrey: "#2C2C2C",
  neutralBlack: "#000000",
  alertWarning: "#FFA500",
  alertError: "#D32F2F",
  alertValid: "#388E3C",
  alertInformation: "#1976D2",
};

export const fontWeight: Record<string, string> = {
  light: "300",
  regular: "400",
  medium: "500",
  bold: "700",
};

const theme = createTheme();

export const themeConfig = (colors: ThemeColor): ThemeOptions => ({
  breakpoints: {
    values: {
      xs: 0,
      sm: 760,
      md: 1240,
      lg: 1440,
      xl: 2000,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          height: "100%",
        },
        body: {
          height: "100%",
          "& #root": {
            minHeight: "100%",
          },
        },
      },
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontSize: "16px",
      fontFamily: '"Roboto"',
      fontWeight: fontWeight.medium,
      lineHeight: "24px",
      letterSpacing: "0.1px",
    },
    h1: {
      fontSize: 60,
      fontFamily: '"Roboto"',
      fontWeight: fontWeight.bold,
      lineHeight: "70px",
      [theme.breakpoints.down("md")]: {
        fontSize: 50,
      },
    },
    h2: {
      fontSize: 40,
      fontFamily: '"Roboto"',
      fontWeight: fontWeight.bold,
      lineHeight: "47px",
      [theme.breakpoints.down("md")]: {
        fontSize: 30,
      },
    },
    h3: {
      fontSize: 32,
      fontFamily: '"Roboto"',
      fontWeight: fontWeight.bold,
      lineHeight: "38px",
      [theme.breakpoints.down("md")]: {
        fontSize: 22,
      },
    },
    h4: {
      fontSize: 26,
      fontFamily: '"Roboto"',
      fontWeight: fontWeight.bold,
      lineHeight: "30px",
      [theme.breakpoints.down("md")]: {
        fontSize: 20,
      },
    },
    h5: {
      fontSize: 16,
      fontFamily: '"Roboto"',
      fontWeight: fontWeight.bold,
      lineHeight: "24px",
      [theme.breakpoints.down("md")]: {
        fontSize: 16,
      },
    },
    body1: {
      fontSize: 16,
      fontFamily: '"Roboto"',
      fontWeight: fontWeight.regular,
      lineHeight: "24px",
      textTransform: "none",
    },
    body2: {
      fontSize: 14,
      fontFamily: '"Roboto"',
      fontWeight: fontWeight.regular,
      lineHeight: "21px",
    },
    body3: {
      textTransform: "none",
      fontSize: 12,
      fontFamily: '"Roboto"',
      fontWeight: fontWeight.regular,
      lineHeight: "18px",
    },
  },
});
