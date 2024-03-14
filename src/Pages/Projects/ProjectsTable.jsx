import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { stringAvatar } from '../../utils'
import PropTypes from 'prop-types'
import { Delete, Edit, MoreVert } from '@mui/icons-material'
import { useContext, useState } from 'react'
import { UserContext } from '../../Contexts'


export const ProjectsTable = ({ projects, users,showEditDialog, showDeleteDialog, showDetailsDialog, options }) => {
    function handleClose() {
        setAnchorEl(null)
    }


    const [anchorEl, setAnchorEl] = useState(null)
    const [focusedEntry, setFocusedEntry] = useState(null)
    const appMoreMenuOpen = Boolean(anchorEl)
    const { user } = useContext(UserContext)
    const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } = options
    // TODO: Cacher les options de suppression et modification dans un dropdown (... ou more)
    // TODO: Permettre de reset les champs au clic du bouton reset a droite.
    console.log(user)
    return (
        <>
            <TableContainer>

                <Table sx={{ minWidth: 320 }} size='small' aria-label="list of projects">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Aperçu</TableCell>
                            <TableCell align="left">Ajouté par</TableCell>
                            <TableCell align="left">Date d&apos;ajout</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects?.length > 0 ?
                            projects.map((project) => {
                                const creator = users?.find(u => u.id == project.createdBy)
                                return (
                                    <TableRow
                                        key={'appli' + project.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        hover

                                    >
                                        <TableCell component="th" scope="row">
                                            {project.id}
                                        </TableCell>
                                        <TableCell align="left" sx={{ cursor: 'pointer', maxWidth: '60%', paddingBlock: '2em' }} width='60%'
                                            onClick={() => showDetailsDialog(project)}
                                        >

                                            <Typography variant='span' sx={{ my: 0, fontWeight: 'bold', }}>{project.title}</Typography>
                                            <br />
                                            <Typography color='text.secondary' sx={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                display: "-webkit-box",
                                                "WebkitLineClamp": '2',
                                                "WebkitBoxOrient": "vertical"
                                            }}
                                                variant='span'
                                            >

                                                {project.description}
                                            </Typography>

                                        </TableCell>
                                        <TableCell align="left">
                                            <Stack direction={{ md: 'row' }} alignItems='center' spacing={2}>

                                                <Avatar {...stringAvatar(creator ? creator.firstname + " " + creator.lastname : "??")} />

                                                <Typography variant='subtitle2'> {users?.find(u => u.id == project.createdBy)?.firstname}</Typography>
                                            </Stack>

                                        </TableCell>
                                        <TableCell>
                                            {new Date(project.dateCreated).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={event => {
                                                setFocusedEntry(project)
                                                setAnchorEl(event.currentTarget)
                                            }}

                                            ><MoreVert /></IconButton>


                                        </TableCell>
                                    </TableRow>
                                )
                            }) :
                            <TableRow>
                                <TableCell colSpan={5}>
                                    <Typography variant='subtitle1' color='primary' textAlign='center'> Aucune donnée disponible</Typography>
                                </TableCell>
                            </TableRow>}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                labelRowsPerPage="Eléments par page"
                                colSpan={5}
                                count={projects.length}
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
                            // ActionsComponent={TablePaginationActions}
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

                <MenuItem onClick={() => {
                    handleClose()
                    showEditDialog(focusedEntry)
                }}>

                    <ListItemIcon>
                        <Edit color='warning' fontSize='small' />
                    </ListItemIcon>
                    Modifier
                </MenuItem>
                <MenuItem onClick={() => {
                    handleClose()
                    showDeleteDialog(focusedEntry)
                }}>
                    <ListItemIcon>
                        <Delete color='error' fontSize="small" />
                    </ListItemIcon>
                    Supprimer
                </MenuItem>
            </Menu >
        </>
    )
}
ProjectsTable.propTypes = {
    projects: PropTypes.array.isRequired,
    showEditDialog: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    showDetailsDialog: PropTypes.func.isRequired,
    showDeleteDialog: PropTypes.func.isRequired,
    users: PropTypes.array
}