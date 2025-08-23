import {
  ThemeProvider as MaterialThemeProvider,
  StyledEngineProvider,
  CssBaseline,
  createTheme,
} from "@mui/material";

import { baseOptions } from "./baseOptions";

const theme = () => {

  let theme = createTheme(baseOptions);

  return theme;
};

const ThemeProvider = ({ appTheme, children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <CssBaseline />
      <MaterialThemeProvider theme={theme(appTheme)}>
        {children}
      </MaterialThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeProvider;
