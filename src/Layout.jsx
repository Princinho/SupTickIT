import { Inbox, ListAlt as ListAltIcon, Mail, Menu } from '@mui/icons-material';
import { AppBar, Avatar, Box, Button, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

const drawerWidth = 240;

export const Layout = (props) => {
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
                <Button sx={{ color: 'white', }} onClick={()=>navigate('/')}>SupTickIT</Button>
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

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    backgroundColor: 'white'
                }}
            >
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <Menu />
                    </IconButton>
                    <Stack direction='row' sx={{ border: '1px solid red', width: '100%' }} justifyContent='flex-end'>
                        <Avatar {...stringAvatar('GNAKOU GATIEN ESSOR')} />
                    </Stack>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContents}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box', width: drawerWidth, background: (theme) => theme.palette.primary.main,
                            color: (theme) => theme.palette.primary.light
                        },
                    }}
                    open
                >
                    {drawerContents}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar >

                </Toolbar>

                <Typography paragraph>
                    Main content
                    <Outlet />
                </Typography>
            </Box>
        </Box>
    );



    // ===================================Utils functions================================

    function stringToColor(string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }

    function stringAvatar(name) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
}
