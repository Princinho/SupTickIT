/* eslint-disable react/prop-types */
import { ListAlt as ListAltIcon, Logout, MenuRounded, Settings } from '@mui/icons-material';
import { AppBar, Avatar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Toolbar } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { stringAvatar } from './utils';
import { UserContext } from './Contexts';

const drawerWidth = 240;

export const Layout = (props) => {

    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = useState(null)
    const userMenuOpen = Boolean(anchorEl)
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    function handleClose() {
        setAnchorEl(null)
    }
    const menuIconWidth = '32px'
    const menuItemColor = '#0090D7'
    // const selectedMenuItemColor = 'white'
    const listItemStyles = { color: menuItemColor, '& .MuiListItemText-primary': { fontWeight: '400' } }
    const drawerContents = (
        <Box >
            <Toolbar sx={{ backgroundColor: 'primary.dark' }}>
                <Button sx={{ color: 'white', }} onClick={() => navigate('/')}>SupTickIT</Button>
            </Toolbar>
            <Divider />
            <Box color='primary.light'>
                <List sx={{ paddingBlock: '0' }}>

                    <ListItem disablePadding  >
                        <ListItemButton onClick={() => navigate('projects')} >
                            <ListItemIcon sx={{ minWidth: menuIconWidth }}  >
                                <ListAltIcon sx={{ color: menuItemColor }} />
                            </ListItemIcon>
                            <ListItemText primary={"Projets"} sx={{ ...listItemStyles, textDecoration: 'none' }} />
                        </ListItemButton>

                    </ListItem>
                    <ListItem disablePadding  >
                        <ListItemButton onClick={() => navigate('companies')} >
                            <ListItemIcon sx={{ minWidth: menuIconWidth }}  >
                                <ListAltIcon sx={{ color: menuItemColor }} />
                            </ListItemIcon>
                            <ListItemText primary={"Entreprises"} sx={{ ...listItemStyles, textDecoration: 'none' }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding  >
                        <ListItemButton >
                            <ListItemIcon sx={{ minWidth: menuIconWidth }}  >
                                <ListAltIcon sx={{ color: menuItemColor }} />
                            </ListItemIcon>
                            <ListItemText primary={"Catégories"} sx={listItemStyles} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding  >
                        <ListItemButton onClick={() => navigate('users')}>
                            <ListItemIcon sx={{ minWidth: menuIconWidth }}  >
                                <ListAltIcon sx={{ color: menuItemColor }} />
                            </ListItemIcon>
                            <ListItemText primary={"Utilisateurs"} sx={listItemStyles} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding  >
                        <ListItemButton >
                            <ListItemIcon sx={{ minWidth: menuIconWidth }}  >
                                <ListAltIcon sx={{ color: menuItemColor }} />
                            </ListItemIcon>
                            <ListItemText primary={"Tickets"} sx={listItemStyles} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding  >
                        <ListItemButton >
                            <ListItemIcon sx={{ minWidth: menuIconWidth }}  >
                                <ListAltIcon sx={{ color: menuItemColor }} />
                            </ListItemIcon>
                            <ListItemText primary={"Paramètres"} sx={listItemStyles} />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding  >
                        <ListItemButton >
                            <ListItemIcon sx={{ minWidth: menuIconWidth }}  >
                                <ListAltIcon sx={{ color: menuItemColor }} />
                            </ListItemIcon>
                            <ListItemText primary={"FAQ"} sx={listItemStyles} />
                        </ListItemButton>
                    </ListItem>
                </List>

            </Box>

        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    useEffect(() => {

        if (!user) {
            navigate('/login')
        }
    })
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    backgroundColor: 'white'
                }}
                elevation={2}
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuRounded />
                    </IconButton>
                    <Stack direction='row' sx={{ width: '100%' }} justifyContent='flex-end'>
                        <IconButton onClick={event => setAnchorEl(event.target)}>
                            {user && <Avatar {...stringAvatar(user?.name)} />}
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
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box', background: (theme) => theme.palette.primary.main,
                            width: drawerWidth
                        },

                    }}
                >
                    {drawerContents}
                </Drawer>
                <Drawer
                    variant="permanent"
                    open
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box', width: drawerWidth, background: (theme) => theme.palette.primary.main,
                            color: (theme) => theme.palette.primary.light
                        },
                    }}
                >
                    {drawerContents}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { xs: '95vw', md: `calc(100% - ${drawerWidth}px)` }, flexDirection: 'column' }}
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
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleClose}>
                    <Avatar /> Profil
                </MenuItem>
                <Divider />

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Paramètres
                </MenuItem>
                <MenuItem onClick={() => {
                    setUser(null)
                    handleClose()
                }}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Déconnexion
                </MenuItem>
            </Menu>
        </Box>
    );



    // ===================================Utils functions================================


}
