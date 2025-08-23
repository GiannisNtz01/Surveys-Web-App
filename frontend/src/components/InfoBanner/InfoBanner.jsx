import cn from 'classnames';
import styles from './InfoBanner.module.scss';

const InfoBanner = ({ className, icon, title, body }) => {
  return (
    <article className={cn(className, styles.container)}>
      <div className={styles.titleContainer}>
        {icon}
        <p>{title}</p>
      </div>
      <p className={styles.bodyContainer}>{body}</p>
    </article>
  );
};

export default InfoBanner;
