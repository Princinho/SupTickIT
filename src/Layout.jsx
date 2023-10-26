/* eslint-disable react/prop-types */
import { ListAlt as ListAltIcon, Menu } from '@mui/icons-material';
import { AppBar, Avatar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar } from '@mui/material';
import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { stringAvatar } from './utils';
import { sampleData } from './SampleData';
import { UserContext } from './Contexts';

const drawerWidth = 240;

export const Layout = (props) => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuIconWidth = '32px'
    const menuItemColor = '#0090D7'
    const selectedMenuItemColor = 'white'
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
                        {/* <Link to="applications"> */}
                        <ListItemButton onClick={() => navigate('applications')} >
                            <ListItemIcon sx={{ minWidth: menuIconWidth }}  >
                                <ListAltIcon sx={{ color: selectedMenuItemColor }} />
                            </ListItemIcon>
                            <ListItemText primary={"Applications"} sx={{ ...listItemStyles, color: selectedMenuItemColor, textDecoration: 'none' }} />
                        </ListItemButton>
                        {/* </Link> */}

                    </ListItem>
                </List>
                <List sx={{ paddingBlock: '0' }}>
                    <ListItem disablePadding  >
                        <ListItemButton >
                            <ListItemIcon sx={{ minWidth: menuIconWidth }}  >
                                <ListAltIcon sx={{ color: menuItemColor }} />
                            </ListItemIcon>
                            <ListItemText primary={"Catégories"} sx={listItemStyles} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <List sx={{ paddingBlock: '0' }}>
                    <ListItem disablePadding  >
                        <ListItemButton >
                            <ListItemIcon sx={{ minWidth: menuIconWidth }}  >
                                <ListAltIcon sx={{ color: menuItemColor }} />
                            </ListItemIcon>
                            <ListItemText primary={"Utilisateurs"} sx={listItemStyles} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <List sx={{ paddingBlock: '0' }}>
                    <ListItem disablePadding  >
                        <ListItemButton >
                            <ListItemIcon sx={{ minWidth: menuIconWidth }}  >
                                <ListAltIcon sx={{ color: menuItemColor }} />
                            </ListItemIcon>
                            <ListItemText primary={"Tickets"} sx={listItemStyles} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <List sx={{ paddingBlock: '0' }}>
                    <ListItem disablePadding  >
                        <ListItemButton >
                            <ListItemIcon sx={{ minWidth: menuIconWidth }}  >
                                <ListAltIcon sx={{ color: menuItemColor }} />
                            </ListItemIcon>
                            <ListItemText primary={"Paramètres"} sx={listItemStyles} />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Divider />
                <List sx={{ paddingBlock: '0' }}>
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
                        <Menu />
                    </IconButton>
                    <Stack direction='row' sx={{ width: '100%' }} justifyContent='flex-end'>
                        <Avatar {...stringAvatar(sampleData.users[0].name)} />
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
        </Box>
    );



    // ===================================Utils functions================================


}
