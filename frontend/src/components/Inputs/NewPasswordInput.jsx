import { useState } from "react";
import { isEmptyString } from "utils/stringUtils";
import get from "lodash/get";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import { StandardInput } from "./Inputs";

const NewPasswordInput = ({
  register,
  errors,
  name = "newPassword",
  label,
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

  const validatePassword = (value) => {
    let count = 0;
    if (validateHasAtLeastOneNumber(value)) count++;
    if (validateHasAtLeastOneLowercase(value)) count++;
    if (validateHasAtLeastOneUppercase(value)) count++;
    if (validateHasAtLeastOneSymbol(value)) count++;
    return count >= 3;
  };

  const validateHasAtLeastOneNumber = (value) => value && /.*\d.*/.test(value);

  const validateHasAtLeastOneLowercase = (value) =>
    value && /.*[a-z].*/.test(value);

  const validateHasAtLeastOneUppercase = (value) =>
    value && /.*[A-Z].*/.test(value);

  const validateHasAtLeastOneSymbol = (value) =>
    value && /.*[$&+,:;=\\\\?@#|/'<>.^*()%!-].*/.test(value);
  
  const { ref, ...registerRest } =
    register(name, {
      required: { value: required, message: "This field is required." },
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters.",
      },
      maxLength: {
        value: 64,
        message: "Password cannot exceed 64 characters.",
      },
      validate: (value) => {
        if (!required && isEmptyString(value)) return true;
        return (
          validatePassword(value) ||
          "The password should contain 3 of the following: a lowercase letter, an uppercase letter, a number, and a symbol."
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

export { NewPasswordInput };
