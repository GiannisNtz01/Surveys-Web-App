import styles from "./Widget.module.scss";

const Widget = ({
  title,
  size = "s",
  background,
  distance,
  containerClass = "",
  widgetClass = "",
  children,
  ...props
}) => {
  const widgetClasses = `${size ? styles[`widget-${size}`] : styles.widget} ${
    widgetClass ?? ""
  } ${background ? styles[`widget-${background}`] : ""}`;

  return (
    <section
      className={`${
        distance ? styles[`container-${distance}`] : ""
      } ${containerClass}`}
    >
      {title}
      <div className={widgetClasses} {...props}>
        {children}
      </div>
    </section>
  );
};

export default Widget;
