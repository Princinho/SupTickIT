/* eslint-disable react/prop-types */
import {
  ListAlt as ListAltIcon,
  Logout,
  MenuRounded,
  Settings,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Outlet, matchPath, useLocation, useNavigate } from "react-router-dom";
import { stringAvatar } from "./utils";
import { UserContext } from "./Contexts";
import { useAuthorization } from "./Hooks/useAuthorization";
import { ChangePasswordDialog } from "./Pages/LayoutComponents/ChangePasswordDialog";
import { changePassword } from "./Api";
import { ToastContainer, toast } from "react-toastify";

const drawerWidth = 240;

export const Layout = (props) => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
    useState(false);
  const [newPasswordData, setNewPasswordData] = useState(null);
  const userMenuOpen = Boolean(anchorEl);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const location = useLocation();
  const path = location.pathname;
  function handleClose() {
    setAnchorEl(null);
  }
  function handleChangePassword(data) {
    setIsChangePasswordDialogOpen(false);
    console.log(data);
    if (data) {
      changePassword({ ...data, username: user?.username }).then(setUser(null));
    }
  }
  const { isPathAuthorizedForUser } = useAuthorization();
  useEffect(() => {
    async function callApi() {
      await changePassword(newPasswordData);
    }
    if (newPasswordData) {
      callApi();
      setNewPasswordData(null);
    }
  }, [newPasswordData]);
  const menuIconWidth = "32px";
  const menuItemColor = "whitesmoke";
  // const selectedMenuItemColor = 'white'
  const listItemStyles = {
    color: menuItemColor,
    "& .MuiListItemText-primary": { fontWeight: "400" },
  };
  const drawerContents = (
    <Box>
      <Toolbar>
        <Button sx={{ color: "white" }} onClick={() => navigate("/")}>
          Garage CACYD
        </Button>
      </Toolbar>
      <Divider />
      <Box>
        <List sx={{ paddingBlock: "0" }}>
          <ListItem disablePadding>
            <ListItemButton
              selected={matchPath("/servicecategories/*", path) || false}
              onClick={() => navigate("servicecategories")}
            >
              <ListItemIcon sx={{ minWidth: menuIconWidth }}>
                <ListAltIcon sx={{ color: menuItemColor }} />
              </ListItemIcon>
              <ListItemText
                primary={"Catégories de Service"}
                sx={{ ...listItemStyles, textDecoration: "none" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={matchPath("/vehicles/*", path) || false}
              onClick={() => navigate("vehicles")}
            >
              <ListItemIcon sx={{ minWidth: menuIconWidth }}>
                <ListAltIcon sx={{ color: menuItemColor }} />
              </ListItemIcon>
              <ListItemText
                primary={"Véhicules"}
                sx={{ ...listItemStyles, textDecoration: "none" }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={matchPath("/customers/*", path) || false}
              onClick={() => navigate("customers")}
            >
              <ListItemIcon sx={{ minWidth: menuIconWidth }}>
                <ListAltIcon sx={{ color: menuItemColor }} />
              </ListItemIcon>
              <ListItemText
                primary={"Clients"}
                sx={{ ...listItemStyles, textDecoration: "none" }}
              />
            </ListItemButton>
          </ListItem>

          {isPathAuthorizedForUser("/projects") && (
            <ListItem disablePadding>
              <ListItemButton
                selected={matchPath("/projects/*", path) || false}
                onClick={() => navigate("projects")}
              >
                <ListItemIcon sx={{ minWidth: menuIconWidth }}>
                  <ListAltIcon sx={{ color: menuItemColor }} />
                </ListItemIcon>
                <ListItemText
                  primary={"Projets"}
                  sx={{ ...listItemStyles, textDecoration: "none" }}
                />
              </ListItemButton>
            </ListItem>
          )}
          {isPathAuthorizedForUser("/companies") && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("companies")}
                selected={matchPath("/companies/*", path) || false}
              >
                <ListItemIcon sx={{ minWidth: menuIconWidth }}>
                  <ListAltIcon sx={{ color: menuItemColor }} />
                </ListItemIcon>
                <ListItemText
                  primary={"Entreprises"}
                  sx={{ ...listItemStyles, textDecoration: "none" }}
                />
              </ListItemButton>
            </ListItem>
          )}
          {isPathAuthorizedForUser("/categories") && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("Categories")}
                selected={matchPath("/categories/*", path) || false}
              >
                <ListItemIcon sx={{ minWidth: menuIconWidth }}>
                  <ListAltIcon sx={{ color: menuItemColor }} />
                </ListItemIcon>
                <ListItemText primary={"Catégories"} sx={listItemStyles} />
              </ListItemButton>
            </ListItem>
          )}
          {isPathAuthorizedForUser("/users") && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("users")}
                selected={matchPath("/users/*", path) || false}
              >
                <ListItemIcon sx={{ minWidth: menuIconWidth }}>
                  <ListAltIcon sx={{ color: menuItemColor }} />
                </ListItemIcon>
                <ListItemText primary={"Utilisateurs"} sx={listItemStyles} />
              </ListItemButton>
            </ListItem>
          )}
          {isPathAuthorizedForUser("/tickets/") && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => navigate("tickets")}
                selected={matchPath("/tickets/*", path) || false}
              >
                <ListItemIcon sx={{ minWidth: menuIconWidth }}>
                  <ListAltIcon sx={{ color: menuItemColor }} />
                </ListItemIcon>
                <ListItemText primary={"Tickets"} sx={listItemStyles} />
              </ListItemButton>
            </ListItem>
          )}
          {/* {isPathAuthorizedForUser("/partnerusers") && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("partnerusers")}
                selected={matchPath("/partnerusers/*", path) || false}>
                <ListItemIcon sx={{ minWidth: menuIconWidth }}>
                  <ListAltIcon sx={{ color: menuItemColor }} />
                </ListItemIcon>
                <ListItemText
                  primary={"Comptes Utilisateur"}
                  sx={listItemStyles}
                />
              </ListItemButton>
            </ListItem>
          )} */}
          {/* {isPathAuthorizedForUser("/systemsettings") && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => navigate("systemsettings")}>
                <ListItemIcon sx={{ minWidth: menuIconWidth }}>
                  <ListAltIcon sx={{ color: menuItemColor }} />
                </ListItemIcon>
                <ListItemText primary={"Paramètres"} sx={listItemStyles} />
              </ListItemButton>
            </ListItem>
          )} */}
          {/* <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon sx={{ minWidth: menuIconWidth }}>
                <ListAltIcon sx={{ color: menuItemColor }} />
              </ListItemIcon>
              <ListItemText primary={"FAQ"} sx={listItemStyles} />
            </ListItemButton>
          </ListItem> */}
        </List>
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
        elevation={2}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
            color="primary"
          >
            <MenuRounded />
          </IconButton>
          <Stack
            direction="row"
            sx={{ width: "100%" }}
            justifyContent="flex-end"
          >
            <IconButton onClick={(event) => setAnchorEl(event.target)}>
              {user && (
                <Avatar
                  {...stringAvatar(user?.firstname + " " + user?.lastname)}
                />
              )}
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawerContents}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawerContents}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: "95vw", md: `calc(100% - ${drawerWidth}px)` },
          flexDirection: "column",
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={userMenuOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar /> Profil
        </MenuItem>
        <Divider />

        <MenuItem onClick={() => setIsChangePasswordDialogOpen(true)}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Changement de mot de passe
        </MenuItem>
        <MenuItem
          onClick={() => {
            setUser(null);
            handleClose();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Déconnexion
        </MenuItem>
      </Menu>
      <ChangePasswordDialog
        handleClose={handleChangePassword}
        open={isChangePasswordDialogOpen}
      />
      <ToastContainer />
    </Box>
  );

  // ===================================Utils functions================================
};
