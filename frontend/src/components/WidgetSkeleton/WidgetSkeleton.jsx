import { Skeleton } from '@mui/material';
import Widget from 'components/Widget/Widget';

import styles from './WidgetSkeleton.module.scss';

function WidgetSkeleton({
  show = false,
  children,
  heightInPixels = 196,
  widthInPixels,
  distance,
  size,
  hideTitle = false,
  background,
  ...rest
}) {
  return show ? (
    <Widget
      size={size}
      distance={distance}
      widgetClass={styles.widget}
      background={background}
      {...rest}
      style={{
        width: widthInPixels ? `${widthInPixels}px` : '100%',
        height: `${heightInPixels}px`,
      }}
    >
      {!hideTitle && (
        <Skeleton
          variant="rect"
          height="2rem"
          width="7.75rem"
          className={background === 'selected' ? styles.darkLoader : ''}
        />
      )}
      <Skeleton
        variant="rect"
        width="100%"
        height="2.5rem"
        className={background === 'selected' ? styles.darkLoader : ''}
      />
    </Widget>
  ) : (
    children ?? null
  );
}

export default WidgetSkeleton;
