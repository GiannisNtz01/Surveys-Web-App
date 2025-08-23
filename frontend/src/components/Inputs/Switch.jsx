import { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SwitchMaterial from '@mui/material/Switch';

import styles from './Switch.module.scss';

export default function Switch({
  name,
  label,
  size = 'medium',
  isChecked = false,
  onChange = () => {},
  isDisabled = false,
  containerClass = '',
  ...props
}) {
  const [state, setState] = useState(isChecked);

  const handleChange = (event) => {
    setState(event.target.checked);
    onChange(event.target.checked);
  };

  useEffect(() => {
    setState(isChecked);
  }, [isChecked]);

  const labelClasses = {
    label: label ? styles.label : styles.noLabel,
    disabled: styles.label,
  };
  return (
    <FormGroup className={containerClass}>
      <FormControlLabel
        classes={labelClasses}
        disabled={isDisabled}
        control={
          <SwitchMaterial
            checked={state}
            onChange={handleChange}
            name={name}
            size={size}
            {...props}
          />
        }
        label={label}
      />
    </FormGroup>
  );
}
