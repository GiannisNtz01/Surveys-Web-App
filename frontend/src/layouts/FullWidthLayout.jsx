import styles from './FullWidthLayout.module.scss';
import { Outlet } from "react-router-dom";


const FullWidthLayout = ({
  children,
  containerClass = '',
  mainClass = '',
}) => {
  return (
    <>
      <section className={`${styles.container} ${containerClass}`}>
        <main className={`${styles.column} ${mainClass}`}>
          {children || <Outlet/>}
        </main>
      </section>
    </>
  );
};

export default FullWidthLayout;
