import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import navigationPaths from "configs/navigationPaths";
import useAuthUser from "context/useAuthUser";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout as logoutService } from "api/authApi";
import { primary } from "theme/themeColors";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { stringAvatar } from "utils/stringUtils";

import styles from "./AppBanner.module.scss";

const pagesAdmin = [
  { label: "Home", path: navigationPaths.home },
  { label: "Create survey", path: navigationPaths.adminSurveyCreation },
];

const pagesUser = [{ label: "Home", path: navigationPaths.home }];

function AppBanner() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { isAdmin, isLoggedIn, mutateAccountInfo, username } = useAuthUser();

  const navigate = useNavigate();

  const pages = isAdmin ? pagesAdmin : pagesUser;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = async () => {
    await logoutService();
    await mutateAccountInfo();
    navigate(navigationPaths.login, { replace: true });
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: "5rem !important" }}>
          <NavLink className={styles["logo-desktop"]} to={navigationPaths.home}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: `${primary.secondary} !important`,
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
          </NavLink>
          {isLoggedIn && (
            <Box sx={{ flex: "0 0 auto", display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <NavLink key={page.path} to={page.path}>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography sx={{ textAlign: "center" }}>
                        {page.label}
                      </Typography>
                    </MenuItem>
                  </NavLink>
                ))}
              </Menu>
            </Box>
          )}
          <NavLink to={navigationPaths.home} className={styles["logo-md"]}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                display: { xs: "flex", md: "none" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: `${primary.secondary} !important`,
                textDecoration: "none",
                mr: 0,
              }}
            >
              LOGO
            </Typography>
          </NavLink>
          {isLoggedIn && (
            <>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pages.map((page) => (
                  <NavLink key={page.path} to={page.path}>
                    <Button
                      key={page.path}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: "white", display: "block" }}
                    >
                      {page.label}
                    </Button>
                  </NavLink>
                ))}
              </Box>

              <Tooltip title={username} arrow>
                <Avatar
                  {...stringAvatar(username)}
                  sx={{ width: 32, height: 32 }}
                />
              </Tooltip>

              <IconButton
                size="large"
                aria-label="logout"
                aria-controls="menu-appbar"
                color="white"
                onClick={handleLogout}
                sx={{ ml: 2 }}
              >
                <LogoutIcon className={styles["logout-icon"]} />
              </IconButton>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppBanner;
