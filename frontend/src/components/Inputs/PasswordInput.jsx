
import React from 'react';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import get from 'lodash/get';

import { StandardInput } from './Inputs';

const PasswordInput = ({
  register,
  errors,
  name = 'password',
  label,
  required = true,
  ...rest
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { ref, ...registerRest } =
    register(name, {
      required: { value: required, message: "This field is required." },
    }) || {};

  return (
    <>
      <StandardInput
        inputRef={ref}
        label={label}
        type={showPassword ? 'text' : 'password'}
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

export { PasswordInput };
