import React, { useState, useRef } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { SemiTransparentButton } from './Buttons';
import { ReactComponent as DownArrow } from 'assets/icons/ArrowDownIcon.svg';
import { ReactComponent as UpArrow } from 'assets/icons/ArrowUpIcon.svg';
import IconText from 'components/IconText/IconText';
import SidebarLinkElement from 'components/SidebarElements/SidebarLinkElement';
import SidebarButtonElement from 'components/SidebarElements/SidebarButtonElement';
import styles from './ButtonDropdown.module.scss';

export const ButtonDropdown = ({ label, children, icon, buttonClass = '' }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <section className={styles.container}>
      <SemiTransparentButton
        aria-expanded={open ? 'true' : undefined}
        aria-label={label}
        aria-haspopup="menu"
        onClick={handleToggle}
        className={`${styles.button} ${buttonClass}`}
        ref={anchorRef}
      >
        <IconText
          Icon={icon}
          iconRight={open ? <UpArrow /> : <DownArrow />}
          content={label}
        />
      </SemiTransparentButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        className={styles.popper}
        modifiers={{
          flip: {
            enabled: false,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
          },
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList className={styles.menu}>
                  {React.Children.map(children, (child) =>
                    React.cloneElement(child, {
                      ...child.props,
                      setOpen: setOpen,
                    })
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </section>
  );
};

export const ButtonDropdownElement = ({
  icon,
  content,
  target,
  clickHandler,
  setOpen,
  ...rest
}) => {
  return (
    <MenuItem
      onClick={(event) => {
        setOpen(false);
        clickHandler(event);
      }}
      className={styles['menu-item']}
      {...rest}
    >
      {target ? (
        <SidebarLinkElement
          target={target}
          Icon={icon}
          content={content}
          onClick={clickHandler}
        />
      ) : (
        <SidebarButtonElement
          Icon={icon}
          content={content}
          onClick={clickHandler}
        />
      )}
    </MenuItem>
  );
};
