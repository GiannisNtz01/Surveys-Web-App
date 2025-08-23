import { useContext } from 'react';
import { SnackbarContext } from './SnackbarContext';

const useSnackBar = () => {
  return useContext(SnackbarContext);
};

export default useSnackBar;
