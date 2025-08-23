import cn from "classnames";

import { Snackbar as MaterialSnackbar } from "@mui/material";
import { ReactComponent as FilledCircle } from "../../assets/icons/FilledCircle.svg";
import { ReactComponent as ErrorCircle } from "../../assets/icons/ErrorCircle.svg";
import snackbarTypes from "types/snackbarTypes";
import useSnackBar from "context/useSnackBar";
import IconText from "components/IconText/IconText";

import styles from "./Snackbar.module.scss";

const snackbarIconMap = {
  [snackbarTypes.DEFAULT]: <FilledCircle className={styles.icon} />,
  [snackbarTypes.ERROR]: <ErrorCircle className={styles.icon} />,
};

const Snackbar = ({ className }) => {
  const { snackbar, hideSnackbar } = useSnackBar();

  const snackbarMessageMap = {
    [snackbarTypes.DEFAULT]:
      snackbar?.message || "Action completed successfully!",
    [snackbarTypes.ERROR]:
      snackbar?.message || "Something went wrong. Please try again.",
  };

  return (
    <MaterialSnackbar
      className={cn(className, {
        [styles.error]: snackbar.type === snackbarTypes.ERROR,
        [styles.default]: snackbar.type === snackbarTypes.DEFAULT,
      })}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={snackbar.open}
      autoHideDuration={3000}
      onClose={hideSnackbar}
      message={
        <IconText
          Icon={snackbarIconMap?.[snackbar.type]}
          content={snackbarMessageMap?.[snackbar.type]}
          weight="bold"
        />
      }
    />
  );
};

export default Snackbar;
