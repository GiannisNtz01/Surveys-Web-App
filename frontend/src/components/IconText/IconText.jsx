import cn from 'classnames';
import styles from './IconText.module.scss';

const IconText = ({
  Icon,
  iconRight,
  content,
  containerClass = '',
  contentClass = '',
  iconClass,
  weight = 'regular',
  iconRightClass = '',
  gap = 'm',
}) => {
  return (
    <section
      className={cn(styles.container, styles[`gap-${gap}`], containerClass)}
    >
      {Icon && (
        <div className={cn(styles['icon-default'], iconClass)}>{Icon}</div>
      )}
      {content && (
        <div className={cn(styles[`text-${weight}`], contentClass)}>
          {content}
        </div>
      )}
      {iconRight && (
        <div className={cn(styles['icon-default'], iconRightClass)}>
          {iconRight}
        </div>
      )}
    </section>
  );
};

export default IconText;
