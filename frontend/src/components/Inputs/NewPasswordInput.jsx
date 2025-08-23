
import { useTranslation } from 'react-i18next';
import { isEmptyString } from 'utils/stringUtils';
import get from 'lodash/get';

import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { validatePassword } from 'utils/validators';
import { StandardInput } from './Inputs';

const NewPasswordInput = ({
  register,
  errors,
  name = 'newPassword',
  label,
  required = true,
  ...rest
}) => {
  const { t } = useTranslation(['inputs']);
  const baseName = 'inputs:errors';

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
      minLength: {
        value: 8,
        message: t(`${baseName}.minLengthConfirmPassword`),
      },
      maxLength: {
        value: 64,
        message: t(`${baseName}.maxLengthConfirmPassword`),
      },
      validate: (value) => {
        if (!required && isEmptyString(value)) return true;
        return (
          validatePassword(value) || t(`${baseName}.confirm-password-rules`)
        );
      },
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

export { NewPasswordInput };
