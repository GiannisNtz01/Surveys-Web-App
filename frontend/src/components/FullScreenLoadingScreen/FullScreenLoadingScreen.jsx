import { CircularProgress } from '@mui/material';
import cn from 'classnames';

import styles from "./FullScreenLoadingScreen.module.scss";

const GenericLoader = ({
  progressClass,
  secondary = false,
  size = 64,
  thickness = 5,
  variant = 'indeterminate',
  disableShrink = true,
  color = '#ffffff',
}) => {
  return (
    <div
      className={cn(styles.wrapper, {
        [styles['wrapper-secondary']]: secondary,
      })}
    >
      <div className={styles.innerWrapper}>
        <CircularProgress
          className={progressClass ? progressClass : styles.progress}
          variant={variant}
          disableShrink={disableShrink}
          size={size}
          thickness={thickness}
          style={{ color: color }}
        />
      </div>
    </div>
  );
};

export default GenericLoader;
