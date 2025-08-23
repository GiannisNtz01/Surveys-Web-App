import { createContext, useState, useMemo, useCallback } from 'react';

import snackbarTypes from 'types/snackbarTypes';

export const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: snackbarTypes.DEFAULT,
  });

  const showSnackbar = useCallback(
    ({ message = '', type = snackbarTypes.DEFAULT } = {}) => {
      setSnackbar({ open: true, message, type });
    },
    []
  );

  const hideSnackbar = useCallback(() => {
    setSnackbar({ open: false });
  }, []);

  const value = useMemo(
    () => ({
      snackbar,
      showSnackbar,
      hideSnackbar,
    }),
    [snackbar, showSnackbar, hideSnackbar]
  );

  return (
    <SnackbarContext.Provider value={value}>
      {children}
    </SnackbarContext.Provider>
  );
};
