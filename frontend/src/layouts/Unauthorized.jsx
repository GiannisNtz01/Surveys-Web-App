import styles from './Unauthorized.module.scss';

const Unauthorized = ({ children }) => {
  return <section className={styles.container}>{children}</section>;
};

export default Unauthorized;
