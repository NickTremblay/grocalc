import { ThemeOptions, createTheme } from "@mui/material/styles";

export const mainThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    primary: {
      main: "#2385da",
    },
    secondary: {
      main: "#967cde",
    },
    error: {
      main: "#fc5335",
    },
    info: {
      main: "#2385da",
    },
    success: {
      main: "#388e3c",
    },
    divider: "rgba(255,255,255,0.5)",
  },

  typography: {
    fontFamily: "Poppins",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },

    MuiTypography: {
      variants: [
        {
          props: { variant: "button" },
          style: {
            textTransform: "none",
            fontSize: "1rem"
          },
        },
      ],
    },
  },
};

export const mainTheme = createTheme(mainThemeOptions);