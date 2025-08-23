import {
  error,
  primary,
  secondary,
  success,
  grayscale,
  disabled,
  text,
  highlight,
} from "./themeColors";

export const baseOptions = {
  direction: "ltr",
  palette: {
    error,
    primary,
    secondary,
    success,
    grayscale,
    disabled,
    highlight,
    divider: grayscale.main,
    background: {
      default: grayscale.main,
    },
    text: {
      ...text,
      primary: primary.dark,
      secondary: grayscale.main,
      disabled: disabled,
    },
    mode: "light",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 7px 20px 0 rgba(63,95,127,0.08)",
          border: "none",
          borderRadius: "1rem",
          padding: "1.5rem 1rem",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        fallback: {
          height: "2rem",
          width: "2rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: "999px",
          color: "inherit",
          boxShadow: "none",
          padding: "0.875rem 1.5rem",
          fontSize: "1rem",
          fontWeight: "700",
          lineHeight: "20px",
          minHeight: "48px",
        },
        outlinedPrimary: {
          backgroundColor: primary.secondary,
          border: "none",
          padding: "0.875rem 1.5rem",
          color: primary.main,
          "&:hover": {
            backgroundColor: grayscale.light,
            boxShadow: "none",
            border: `1px solid ${primary.main}`,
          },
          "&.Mui-disabled": {
            backgroundColor: grayscale.white,
            borderColor: primary.main,
            color: primary.main,
            opacity: 0.6,
          },
        },
        outlinedError: {
          backgroundColor: grayscale.white,
          borderColor: error.main,
          height: "40px",
          color: error.main,
          display: "flex",
          gap: "0.5rem",
          fontWeight: 400,
          "&:hover": {
            backgroundColor: grayscale.light,
            boxShadow: "none",
          },
          "&.Mui-disabled": {
            backgroundColor: grayscale.white,
            borderColor: primary.main,
            color: primary.main,
            opacity: 0.6,
          },
        },
        containedPrimary: {
          backgroundColor: primary.main,
          color: "white",
          "&:hover": {
            backgroundColor: primary.light,
            boxShadow: "none",
          },
          "&.Mui-disabled": {
            backgroundColor: primary.main,
            color: "white",
            opacity: 0.6,
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          boxSizing: "border-box",
        },
        html: {
          MozOsxFontSmoothing: "grayscale",
          WebkitFontSmoothing: "antialiased",
          height: "100%",
          width: "100%",
        },
        body: {
          height: "100%",
        },
        a: {
          textDecoration: "none",
          color: "inherit",
        },
        "#root": {
          height: "100%",
        },
        "input[type=number]::-webkit-outer-spin-button, input[type=number]::-webkit-inner-spin-button":
          {
            WebkitAppearance: "none",
            margin: 0,
          },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: grayscale.main,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "auto",
          marginRight: "1rem",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          ".MuiCard-root": {
            height: "fit-content",
            boxShadow: "0px 7px 30px 3px rgba(63, 95, 127, 0.05)",
          },
          "&.MuiAccordion-root:before": {
            backgroundColor: "transparent",
          },
          "&.MuiAutocomplete-paper": {
            fontWeight: "400",
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        circle: {
          stroke: "white",
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: highlight.main,
          },
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          "& .MuiPopover-paper": {
            boxShadow: "none",
            borderRadius: "8px",
            border: `2px solid ${grayscale.main}`,
            maxHeight: "352px",
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.MuiChip-root .MuiChip-deleteIcon": {
            fontSize: "16px",
          },
          "&.MuiMenuItem-root": {
            color: grayscale.white,
            fontWeight: 400,
          },
          "&.MuiIconButton-root": {
            width: "32px",
            height: "32px",
          },
          "&.MuiIconButton-root.Mui-disabled": {
            svg: { color: disabled.button, transition: "color 0.3s ease" },
          },
          "&.MuiTab-root": {
            padding: "0 16px",
            fontWeight: "300",
            fontSize: "14px",
            borderRadius: "8px 8px 0 0",
            transition: "all 0.3 ease",
            color: primary.main,
            marginLeft: 0,
            marginRight: 0,
            minHeight: "0",
            paddingTop: "6px",
            paddingBottom: "12px",
            "&.Mui-selected": {
              color: primary.main,
              fontWeight: "400",
            },
            "&:hover": {
              backgroundColor: highlight.main,
            },
            "&:focusVisible": {
              fontWeight: "700",
            },
          },
          "&.MuiPickersDay-root.Mui-disabled": {
            color: disabled.main,
          },
          "&.MuiToggleButton-root": {
            textTransform: "none",
            padding: "0 8px",
            backgroundColor: grayscale.medium,
            color: primary.main,
            transition: "color 0.3s ease, background-color 0.3s ease",
            "&:hover": {
              color: primary.dark,
              backgroundColor: grayscale.medium,
            },
          },
          "&.MuiToggleButton-root.Mui-selected": {
            backgroundColor: primary.main,
            color: grayscale.white,
            "&:hover": {
              backgroundColor: primary.dark,
              color: grayscale.white,
            },
          },
          "&.MuiCheckbox-root": {
            padding: "2px",
            color: "inherit",
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 48,
          height: 24,
          padding: 0,
          "& .MuiSwitch-switchBase": {
            padding: 0,
            margin: 2,
            backgroundColor: "transparent!important",
            transitionDuration: "300ms",
            "&.Mui-checked": {
              transform: "translateX(26px)",
              marginLeft: 0,
              color: "#fff",
              backgroundColor: "transparent",
              "& .MuiSwitch-thumb": {
                marginLeft: 0,
              },

              "& + .MuiSwitch-track": {
                backgroundColor: primary.main + "!important",
                opacity: 1,
                border: 0,
              },
            },
          },
          "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 18,
            height: 18,
            color: grayscale.white,
            marginLeft: "4px",
            marginTop: "1px",
          },
          "& .MuiSwitch-track": {
            borderRadius: "12px",
            backgroundColor: "#6E706B",
            opacity: 1,
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          "&.MuiTablePagination-toolbar": {
            paddingLeft: "0 !important",
          },
          "&.MuiTablePagination-toolbar .MuiTablePagination-actions": {
            display: "none",
          },
          "&.MuiTablePagination-toolbar > .MuiInputBase-root": {
            margin: "0 0.8rem",
          },
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: {
          "&.MuiInputBase-input": {
            "&.MuiFilledInput-input": {
              paddingTop: "8px",
              paddingBottom: "8px",
              "&:focus": {
                backgroundColor: "transparent",
              },
            },
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          "&.MuiSvgIcon-root.MuiSelect-icon": {
            color: primary.main,
            "&.Mui-disabled": {
              color: disabled.button,
            },
          },
          "&.MuiStepIcon-root.Mui-completed": {
            border: `2px solid ${primary.dark}`,
            borderRadius: "50%",
            color: `${primary.main} !important`,
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: `${text.main}`,
          "&:disabled": {
            color: `${text.disabled} !important`,
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: "16px !important",
          "&.MuiFilledInput-root": {
            backgroundColor: `${grayscale.white} !important`,
            fontSize: "14px",
            lineHeight: "16px",
            fontWeight: "400",
            transition: "all 0.3 ease",
            boxSizing: "border-box",
            paddingTop: "18px",
            minHeight: "56px",
            paddingLeft: "4px !important",
            paddingBottom: "4px !important",
            "&.Mui-disabled": {
              backgroundColor: grayscale.white,
              color: disabled.button,
              border: `1px solid ${grayscale.main}`,
            },
          },
          "& input::placeholder": {
            fontSize: "14px",
            color: grayscale.dark,
            opacity: 1,
          },
          "&.MuiFilledInput-root.Mui-focused": {
            backgroundColor: grayscale.white,
            border: `1px solid ${grayscale.dark}`,
            "&.Mui-error": {
              outline: `1px solid ${error.main}`,
            },
          },
          "&.MuiFilledInput-root:hover": {
            backgroundColor: grayscale.white,
            border: `1px solid ${grayscale.dark}`,
            "&.Mui-error": {
              outline: `1px solid ${error.main}`,
            },
          },
          "&.MuiFilledInput-root:before": {
            borderBottom: "none",
          },
          "&.MuiFilledInput-root:after": {
            borderBottom: "none",
          },
          "& .MuiTablePagination-select": {
            backgroundColor: grayscale.white,
            borderRadius: "28px",
            border: "1px solid rgba(63, 95, 127, 0.5)",
            color: primary.dark,
            marginLeft: "8px",
          },
        },
        input: {
          "&.MuiFilledInput-input": {
            padding: "0 !important",
            paddingLeft: "12px !important",
            paddingRight: "12px !important",
            width: "100% !important",
            alignSelf: "flex-end !important",
          },
        },
        inputMultiline: {
          marginTop: "2px !important",
          marginBottom: "-2px !important",
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          position: "absolute",
          right: "20px",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          position: "initial",
          color: primary.main,
          display: "flex",
          alignItems: "center",
          gap: "4px",
          fontSize: "14px",
          lineHeight: "16px",
          "&.Mui-error": {
            marginTop: "8px",
            color: error.dark,
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          margin: 0,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: 0,
          "& input::placeholder": {
            color: text.disabled,
            opacity: 1,
          },
          "& label": {
            color: grayscale.dark,
            opacity: 1,
            fontWeight: 400,
            "&.Mui-error": {
              color: grayscale.dark,
            },
          },
          "& .MuiFilledInput-root": {
            "&.Mui-error": {
              border: `2px solid ${error.main} !important`,
            },
            border: `1px solid ${grayscale.dark} !important`,
          },
          "& .MuiFormLabel-asterisk": {
            display: "none",
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            opacity: 0.6,
          },
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          "&.MuiSnackbar-root": {
            "& > div": {
              boxShadow: "none",
              padding: "1rem",
              borderRadius: "1rem",
              background: "transparent",
              "& > div": {
                padding: 0,
                fontSize: "1rem",
                fontWeight: 400,
                color: primary.dark,
              },
            },
          },
        },
      },
    },
  },
  typography: {
    fontFamily: `'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans','Helvetica Neue', sans-serif`,
    button: {
      fontWeight: 400,
    },
    h1: {
      fontWeight: 400,
      fontSize: "1.5rem",
    },
    h2: {
      fontWeight: 400,
      fontSize: "1.125rem",
    },
    h3: {
      fontWeight: "400!important",
      fontSize: "1rem",
    },
    h4: {
      fontWeight: 400,
      fontSize: "0.85rem",
    },
    h5: {
      fontWeight: 400,
      fontSize: "0.65rem",
    },
    h6: {
      fontWeight: 400,
      fontSize: "1rem",
    },
    overline: {
      fontWeight: 400,
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
    },
    body2: {
      fontWeight: 400,
      fontSize: "1rem",
    },
  },
};
