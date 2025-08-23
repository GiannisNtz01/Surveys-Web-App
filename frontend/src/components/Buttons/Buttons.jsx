import Button from '@mui/material/Button';

import InnerLoader from './InnerLoader';
import styles from './Buttons.module.scss';

/**
 * Button components for several occassions based on the Material UI buttons https://mui.com/components/buttons/
 */
const PrimaryButton = (props) => {
  return (
    <Button variant="contained" {...props}>
      {props.children}
    </Button>
  );
};

const SecondaryButton = (props) => {
  return (
    <Button variant="outlined" {...props}>
      {props.children}
    </Button>
  );
};

const TextButton = ({ loading, containerClass, ...props }) => {
  return (
    <InnerLoader loading={loading} className={containerClass} color="#ffffff">
      <Button {...props}>{props.children}</Button>
    </InnerLoader>
  );
};

const PrimaryButtonLoader = ({ loading, children, ...rest }) => {
  return (
    <InnerLoader loading={loading} color="#00084e">
      <PrimaryButton {...rest}>{children}</PrimaryButton>
    </InnerLoader>
  );
};

const SecondaryButtonLoader = ({
  loading,
  children,
  loaderClass = '',
  ...rest
}) => {
  return (
    <InnerLoader loading={loading} className={loaderClass}>
      <SecondaryButton {...rest}>{children}</SecondaryButton>
    </InnerLoader>
  );
};

const NoStylesButton = ({ extraClasses, ...rest }) => {
  return (
    <button className={`${styles.emptyButton} ${extraClasses}`} {...rest}>
      {rest.children}
    </button>
  );
};

const LinkButton = ({ extraClasses, ...rest }) => {
  return (
    <button className={`${styles.linkButton} ${extraClasses}`} {...rest}>
      {rest.children}
    </button>
  );
};


export {
  PrimaryButton,
  SecondaryButton,
  TextButton,
  PrimaryButtonLoader,
  SecondaryButtonLoader,
  NoStylesButton,
  LinkButton,
};
