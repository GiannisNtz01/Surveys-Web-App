import get from 'lodash/get';

import { StandardInput } from './Inputs';
import { validateEmail } from 'utils/validators';
import { isEmptyString } from 'utils/stringUtils';

const EmailInput = ({
  register = () => {},
  errors = {},
  label,
  name = 'email',
  required = true,
  ...rest
}) => {
  const { ref, ...registerRest } =
    register(name, {
      required: { value: required, message: "This field is required." },
      validate: {
        emailValidity: (v) =>
          (!required && isEmptyString(v)) ||
          validateEmail(v) ||
          "The email address is not valid.",
      },
    }) || {};

  return (
    <>
      <StandardInput
        inputRef={ref}
        label={label}
        type="email"
        errorMessage={get(errors, `${name}.message`, null)}
        error={get(errors, `${name}`, null) !== null}
        {...rest}
        {...registerRest}
      />
    </>
  );
};

export { EmailInput };
