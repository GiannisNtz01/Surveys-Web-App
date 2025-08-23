
import TextField from '@mui/material/TextField';

const StandardInput = ({
  errorMessage = '',
  label = '',
  startAdornment = null,
  endAdornment = null,
  readOnly = false,
  disabled = false,
  maxLength = null,
  InputProps,
  ...restProps
}) => {
  const { 'aria-label': ariaLabel = label } = restProps;
  return (
    <TextField
      label={label}
      helperText={errorMessage}
      disabled={disabled}
      id={`input_${restProps?.name ?? label}`}
      {...restProps}
      slotProps={{
        input: {
          startAdornment: startAdornment,
          ...(InputProps ? InputProps : {}),
          endAdornment: endAdornment,
          readOnly: readOnly,
          disabled: disabled,
        },

        htmlInput: {
          maxLength: maxLength,
          'aria-label': ariaLabel,
        }
      }} />
  );
};

export { StandardInput };
