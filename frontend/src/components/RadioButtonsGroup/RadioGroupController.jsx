import RadioButtonsGroup from "@mui/material/RadioGroup";

import { Controller } from 'react-hook-form';
import { FormLabel } from '@mui/material';

import styles from './RadioGroupController.module.scss';

export default function RadioGroupController({
  children,
  name,
  labelValue,
  control,
  classes = styles,
}) {
  return (
    <>
      <FormLabel component="legend">{labelValue}</FormLabel>
      <Controller
        render={({
          field: { onChange, onBlur, value, name, ref },
          fieldState: { invalid, isTouched, isDirty, error },
          formState,
        }) => (
          <RadioButtonsGroup classes={classes}>{children}</RadioButtonsGroup>
        )}
        name={name}
        control={control}
      />
    </>
  );
}
