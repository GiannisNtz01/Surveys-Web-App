import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import { secondary, error } from "theme/themeColors";

import styles from "./RadioButton.module.scss";

export default function RadioButton({
  value,
  label,
  labelPlacement = "end",
  register,
  name = "radio_btn",
  error: hasError,
  required = true,
  classes = styles,
  ...props
}) {
  const registerProps = register
    ? register(name, { required: required && "This option is required" })
    : {};

  return (
    <>
      <FormControlLabel
        value={value}
        label={label}
        labelPlacement={labelPlacement}
        control={
          <Radio
            sx={{
              color: hasError ? error.main : secondary.dark,
              "&.Mui-checked": {
                color: hasError ? error.main : secondary.dark,
              },
            }}
            {...registerProps}
          />
        }
        classes={classes}
        {...props}
      />
    </>
  );
}
