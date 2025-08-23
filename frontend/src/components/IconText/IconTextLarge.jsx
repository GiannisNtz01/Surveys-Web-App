import { ReactComponent as SuccessIcon } from 'assets/icons/CheckGreen.svg';
import { ReactComponent as ErrorIcon } from 'assets/icons/ErrorIcon.svg';

import styles from './IconTextLarge.module.scss';

const IconTextLarge = ({
  success = false,
  header,
  message,
  showIcon = true,
}) => {
  return (
    <>
      <section className={styles.icon}>
        {showIcon && success === false && <ErrorIcon width={72} height={72} />}
        {showIcon && success === true && <SuccessIcon width={72} height={72} />}
      </section>
      {header && <p className={styles.header}>{header}</p>}
      {message && <p className={styles.message}>{message}</p>}
    </>
  );
};

export default IconTextLarge;
