import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SWRconfig } from "./utils/SWRConfig.js";
import { SWRConfig } from "swr";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "utils/AppRouter.jsx";
import { AuthUserProvider } from "./context/AuthUser.jsx";

import "./styles/index.scss";
import ThemeProvider from "./theme/ThemeProvider.jsx";

import { SnackbarProvider } from "context/SnackbarContext.jsx";
import Snackbar from "components/Snackbar/Snackbar.jsx";
import SWRConfigCustom from "context/SWRConfigCustom.jsx";


createRoot(document.getElementById("root")).render(
  <SWRConfig value={SWRconfig}>
      <BrowserRouter>
        <ThemeProvider
          appTheme={{
            responsiveFontSizes: true,
          }}
        >
          <AuthUserProvider>
            <SWRConfigCustom>
              <SnackbarProvider>
                <StrictMode>
                  <AppRouter />
                  <Snackbar />
                </StrictMode>
              </SnackbarProvider>
            </SWRConfigCustom>
          </AuthUserProvider>
        </ThemeProvider>
      </BrowserRouter>
  </SWRConfig>
);
