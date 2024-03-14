import { Divider, IconButton, ListItemIcon, Menu, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'

import PropTypes from 'prop-types'
import { Delete, Edit, MoreVert, RestartAlt, Tune } from '@mui/icons-material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RoleChip } from '../../Components/RoleChip'


export const UsersTable = ({ users, showEditDialog, companies, showDeleteDialog, showResetPasswordDialog, options }) => {
    function handleClose() {
        setAnchorEl(null)
    }
    const [anchorEl, setAnchorEl] = useState(null)
    const [focusedEntry, setFocusedEntry] = useState(null)
    const appMoreMenuOpen = Boolean(anchorEl)
    const navigate = useNavigate()
    const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } = options
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;
    return (
        <>
            <Divider sx={{ marginTop: '1em' }} />
            <TableContainer>

                <Table sx={{ minWidth: 320 }} size='small' aria-label="list of projects">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Nom Complet</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Roles</TableCell>
                            <TableCell align="left">Derniere Connexion</TableCell>
                            <TableCell align="left">Entreprise</TableCell>
                            <TableCell align="left">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length > 0 ?
                            (rowsPerPage > 0
                                ? users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : users
                            ).map((user) => (
                                <TableRow
                                    key={'appli' + user.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    hovere
                                >
                                    <TableCell component="th" scope="row">
                                        {user.id}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        <Typography variant='body2'>
                                            {`${user.firstname} ${user.lastname}`}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="left" sx={{ cursor: 'pointer', }}
                                    // onClick={() => navigate(`${user.id}`)}
                                    >
                                        <Link to={`${user.id}`}>
                                            <Typography color='text.secondary' sx={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                display: "-webkit-box",
                                                "WebkitLineClamp": '1',
                                                "WebkitBoxOrient": "vertical"
                                            }}
                                                variant='span'
                                            >

                                                {user.username}
                                            </Typography>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Stack direction='row' flexWrap='wrap' sx={{ minWidth: '5rem' }}>

                                            {user.roles?.map(role => <RoleChip key={`role-${role}`} roleId={role} />)}
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(user.lastLoginDate).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='body2'>
                                            {companies?.find(company => company.id == user.companyId)?.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={event => {
                                            setFocusedEntry(user)
                                            setAnchorEl(event.currentTarget)
                                        }}>
                                            <MoreVert />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )) :
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Typography variant='subtitle1' color='primary' textAlign='center'> Aucune donnée disponible</Typography>
                                </TableCell>
                            </TableRow>}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: '-1' }]}
                                labelRowsPerPage="Eléments par page"
                                colSpan={7}
                                count={users.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={(event, newPage) => handlePageChange(newPage)}
                                onRowsPerPageChange={(event) => (handleRowsPerPageChange(parseInt(event.target.value, 10)))}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={appMoreMenuOpen}
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

                <MenuItem onClick={() => {handleClose();showEditDialog(focusedEntry)}}>
                    <ListItemIcon>
                        <Edit color='warning' fontSize='small' />
                    </ListItemIcon>
                    Modifier
                </MenuItem>
                <MenuItem onClick={() => {handleClose();showResetPasswordDialog(focusedEntry)}}>
                    <ListItemIcon>
                        <RestartAlt color='warning' fontSize='small' />
                    </ListItemIcon>
                    Reinitialiser le mot de passe
                </MenuItem>
                <MenuItem onClick={() => { navigate(`${focusedEntry?.id}`) }}>
                    <ListItemIcon>
                        <Tune color='primary' fontSize='small' />
                    </ListItemIcon>
                    Roles et Accès
                </MenuItem>

                <MenuItem onClick={() => { handleClose(); showDeleteDialog(focusedEntry) }}>
                    <ListItemIcon>
                        <Delete color='error' fontSize="small" />
                    </ListItemIcon>
                    Supprimer
                </MenuItem>
            </Menu >
        </>
    )
}
UsersTable.propTypes = {
    users: PropTypes.array.isRequired,
    showEditDialog: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    showDetailsDialog: PropTypes.func.isRequired,
    companies:PropTypes.array.isRequired,
    showDeleteDialog: PropTypes.func.isRequired,
    showResetPasswordDialog:PropTypes.func.isRequired
}