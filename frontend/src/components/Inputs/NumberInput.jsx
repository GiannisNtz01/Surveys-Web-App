
import { useTranslation } from 'react-i18next';
import get from 'lodash/get';

import { numberRegexPattern } from 'utils/product/config';
import { StandardInput } from './Inputs';

const NumberInput = ({
  register,
  errors,
  label,
  maxLength = 1000,
  minLength = 0,
  name = 'text',
  required = true,
  regexPattern = numberRegexPattern,
  rules = () => {},
  onBlur = () => {},
  onChange = () => {},
  ...rest
}) => {
  const { t } = useTranslation(['inputs']);
  const baseName = 'inputs:errors';
  const { ref, ...registerRest } =
    register(name, {
      required: { value: required, message: "This field is required." },
      maxLength: {
        value: maxLength,
        message: t(`${baseName}.maxLengthNumber`, { max: maxLength }),
      },
      minLength: {
        value: minLength,
        message: t(`${baseName}.minLengthNumber`, { min: minLength }),
      },
      pattern: {
        value: regexPattern,
        message: t(`${baseName}.isNotNumber`),
      },
      validate: { rules },
      onBlur: onBlur,
      onChange: onChange,
    }) || {};

  return (
    <>
      <StandardInput
        inputRef={ref}
        label={label}
        type="text"
        errorMessage={get(errors, `${name}.message`, null)}
        error={get(errors, `${name}`, null) !== null}
        {...rest}
        {...registerRest}
      />
    </>
  );
};

export { NumberInput };
