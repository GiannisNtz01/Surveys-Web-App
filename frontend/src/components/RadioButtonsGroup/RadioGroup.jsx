import RadioButtonsGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";

export default function RadioGroup({
  children,
  value,
  name,
  labelValue,
  labelClass = "",
  handleChange,
  containerClass = "",
  error,
}) {
  return (
    <FormControl>
      {labelValue && <FormLabel className={labelClass}>{labelValue}</FormLabel>}
      <RadioButtonsGroup
        name={name}
        value={value}
        onChange={handleChange}
        className={containerClass}
      >
        {children}
      </RadioButtonsGroup>
      {error && (
        <FormHelperText sx={{ m: 0 }} error>
          {error?.message}
        </FormHelperText>
      )}
    </FormControl>
  );
}
