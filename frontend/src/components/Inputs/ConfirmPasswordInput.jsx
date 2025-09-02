import { useState } from "react";
import { isEmptyString } from "utils/stringUtils";

import get from "lodash/get";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { StandardInput } from "./Inputs";

const ConfirmPasswordInput = ({
  register,
  errors,
  name = "confirmPassword",
  comparedInputName,
  label,
  watch,
  required = true,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { ref, ...registerRest } =
    register(name, {
      required: { value: required, message: "This field is required." },
      validate: (value) => {
        if (!required && isEmptyString(value)) return true;
        return (
          value === watch(comparedInputName) ||
          "Password should be the same on both fields."
        );
      },
    }) || {};
  return (
    <>
      <StandardInput
        inputRef={ref}
        label={label}
        type={showPassword ? "text" : "password"}
        errorMessage={get(errors, `${name}.message`, null)}
        error={get(errors, `${name}`, null) !== null}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...rest}
        {...registerRest}
      />
    </>
  );
};

export { ConfirmPasswordInput };
