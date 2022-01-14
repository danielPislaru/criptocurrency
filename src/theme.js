import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#2A3C44",
      light: "#5C737C",
      dark: "#0D242E",
      contrastText: "#96A7AF",
    },
    secondary: {
      main: "#ffcb3b",
      contrastText: "#96A7AF",
    },
    neutral: {
      main: "#F6FAFB",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
  typography: {
    allVariants: {
      color: "#96A7AF",
    },
  },
});

theme = responsiveFontSizes(theme);

theme.typography.body2 = {
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
  },
};

theme.typography.subtitle2 = {
  [theme.breakpoints.down("md")]: {
    fontSize: "0.6rem",
  },
};

theme.typography.subtitle1 = {
  [theme.breakpoints.down("md")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.6rem",
  },
};
theme.typography.h6 = {
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.8rem",
  },
};
theme.typography.h4 = {
  [theme.breakpoints.down("md")]: {
    fontSize: "1.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.1rem",
  },
};
theme.typography.h1 = {
  [theme.breakpoints.down("md")]: {
    fontSize: "2.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
};
theme.typography.h2 = {
  [theme.breakpoints.down("md")]: {
    fontSize: "2.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.8rem",
  },
};

theme = createTheme(theme, {
  palette: {
    primary: {
      main: theme.palette.primary.main,
    },
    secondary: {
      main: theme.palette.secondary.main,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          minWidth: "40px",
          color: theme.palette.neutral.light,
          [theme.breakpoints.down("md")]: {
            fontSize: "0.7rem",
          },
        },
        startIcon: {
          margin: "0",
          color: theme.palette.primary.main,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.light,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          [theme.breakpoints.down("md")]: {
            minHeight: "35px",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.neutral.main,
          [theme.breakpoints.down("md")]: {
            fontSize: "0.8rem",
          },
        },
        notchedOutline: {
          borderColor: theme.palette.primary.light,
        },
      },
    },

    MuiSvgIcon: {
      styleOverrides: {
        root: {
          [theme.breakpoints.down("md")]: {
            fontSize: "1.2rem",
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: "red",
        },
      },
    },
  },
});

export default theme;
