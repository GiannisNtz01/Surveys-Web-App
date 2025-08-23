import React from "react";
import cn from "classnames";
import { IconButton } from "@mui/material";
import { isEmptyString } from "utils/stringUtils";

import { ReactComponent as ErrorIcon } from "assets/icons/ErrorCircle.svg";
import { ReactComponent as CancelIcon } from "assets/icons/CancelIcon.svg";

import styles from "./MessageBox.module.scss";

const ErrorBox = ({ header, ...props }) => {
  return <MessageBox header={header} icon={<ErrorIcon />} {...props} />;
};

const MessageBox = ({
  header,
  message,
  icon,
  open = false,
  closeBox,
  boxClass = "",
  contentClass = "",
  headerClass = "",
  messageClass = "",
  iconClass = "",
  distanceTop = "m",
  distanceBottom = "m",
  id = null,
}) => {
  return (
    open && (
      <article
        className={cn(
          styles.container,
          {
            [styles[`container-top-${distanceTop}`]]:
              !isEmptyString(distanceTop),
            [styles[`container-bottom-${distanceBottom}`]]:
              !isEmptyString(distanceBottom),
          },
          boxClass
        )}
        id={id}
      >
        <section className={styles.topSection}>
          {icon &&
            React.cloneElement(icon, {
              ...icon.props,
              className: cn(styles.icon, iconClass),
            })}
          {header && (
            <h2 className={cn(styles.header, headerClass)}>{header}</h2>
          )}
          <IconButton
            className={styles.cancelIcon}
            aria-label="close"
            disableRipple
            disableFocusRipple={true}
            onClick={closeBox}
          >
            <CancelIcon />
          </IconButton>
        </section>
        <section className={cn(styles.bottomSection, contentClass)}>
          {message && (
            <div
              className={messageClass}
              dangerouslySetInnerHTML={{ __html: message }}
            ></div>
          )}
        </section>
      </article>
    )
  );
};

export { MessageBox, ErrorBox };
