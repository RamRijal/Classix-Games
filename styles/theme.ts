import { createTheme, ThemeOptions } from "@mui/material/styles";

export const lightThemeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
      light: "#63a4ff",
      dark: "#115293",
    },
    secondary: {
      main: "#f50057",
      light: "#ff4081",
      dark: "#c60055",
    },
    background: {
      default: "#ffffff",
      paper: "#f5f5f5",
    },
    text: {
      disabled: "#f50057",
      primary: "#000000",
      secondary: "#757575",
    },
    success: {
      main: "#00C851",
      dark: "#007E33",
    },
    warning: {
      main: "#ffbb33",
      dark: "#ff8800",
    },
    error: {
      main: "#ff4444",
      dark: "#CC0000",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 240,
          backgroundColor: "#f5f5f5",
          transition: "width 300ms ease-in-out",
        },
        paperAnchorDockedLeft: {
          borderRight: "none",
          "&.MuiDrawer-paperAnchorLeft": {
            width: 80, // Minimized width
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
          "@media (min-width:600px)": {
            minHeight: 64,
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.24px",
    },
    h2: {
      fontSize: "2.125rem",
      fontWeight: 700,
      letterSpacing: "-0.24px",
    },
    h3: {
      fontSize: "1.875rem",
      fontWeight: 700,
      letterSpacing: "-0.06px",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "0.25px",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      letterSpacing: "0.25px",
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
      letterSpacing: "0.15px",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      letterSpacing: "0.15px",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: "0.1px",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "1.5",
      letterSpacing: "0.5px",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.43",
      letterSpacing: "0.25px",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: "0.75px",
      textTransform: "uppercase",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      letterSpacing: "0.4px",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 400,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
};
export const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#5457b6",
      light: "#5457b6",
      dark: "#5457b6",
    },
    secondary: {
      main: "#ed6468",
      light: "#ed6468",
      dark: "#ed6468",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    text: {
      disabled: "#757575",
      primary: "#ffffff", // Light text for dark mode
      secondary: "#b0b0b0", // Secondary text for dark mode
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: 260,
          backgroundColor: "#f5f5f5",
          transition: "width 300ms ease-in-out",
        },
        paperAnchorDockedLeft: {
          borderRight: "none",
          "&.MuiDrawer-paperAnchorLeft": {
            width: 80, // Minimized width
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: 64,
          "@media (min-width:600px)": {
            minHeight: 64,
          },
        },
      },
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
      letterSpacing: "-0.24px",
    },
    h2: {
      fontSize: "2.125rem",
      fontWeight: 700,
      letterSpacing: "-0.24px",
    },
    h3: {
      fontSize: "1.875rem",
      fontWeight: 700,
      letterSpacing: "-0.06px",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 600,
      letterSpacing: "0.25px",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 600,
      letterSpacing: "0.25px",
    },
    h6: {
      fontSize: "1.125rem",
      fontWeight: 600,
      letterSpacing: "0.15px",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
      letterSpacing: "0.15px",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: "0.1px",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: "1.5",
      letterSpacing: "0.5px",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.43",
      letterSpacing: "0.25px",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      letterSpacing: "0.75px",
      textTransform: "uppercase",
    },
    caption: {
      fontSize: "0.75rem",
      fontWeight: 400,
      letterSpacing: "0.4px",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: 400,
      letterSpacing: "1.5px",
      textTransform: "uppercase",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);
