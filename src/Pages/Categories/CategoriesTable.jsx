import { Avatar, IconButton, ListItemIcon, Menu, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'
import { stringAvatar } from '../../utils'
import PropTypes from 'prop-types'
import { Delete, Edit, MoreVert } from '@mui/icons-material'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUsers } from '../../Api'


export const CategoriesTable = ({ categories, showEditDialog, showDeleteDialog, projects, showDetailsDialog, options }) => {
    function handleClose() {
        setAnchorEl(null)
    }

    const { data: users } = useQuery({ queryKey: ['users'], queryFn: getAllUsers })
    const [anchorEl, setAnchorEl] = useState(null)
    const [focusedEntry, setFocusedEntry] = useState(null)
    const appMoreMenuOpen = Boolean(anchorEl)
    const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } = options
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categories.length) : 0;
    return (
        <>
            <TableContainer>

                <Table sx={{ minWidth: 320 }} size='small' aria-label="list of categories">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Aperçu</TableCell>
                            <TableCell align="left">Projet</TableCell>
                            <TableCell align="left">Ajouté par</TableCell>
                            <TableCell align="left">Date d&apos;ajout</TableCell>
                            <TableCell align="left">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories?.length > 0 ?
                            categories.map((cat) => {
                                // console.log(users)
                                const creator = users?.find(u => u.id == cat.createdBy)
                                const creatorName = creator ? creator?.firstname + " " + creator?.lastname : "??"
                                return (
                                    <TableRow
                                        key={'appli' + cat.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        hover

                                    >
                                        <TableCell component="th" scope="row">
                                            {cat.id}
                                        </TableCell>
                                        <TableCell align="left" sx={{ cursor: 'pointer', maxWidth: '30%' }} width='30%'
                                            onClick={() => showDetailsDialog(cat)}
                                        >

                                            <Typography variant='span' sx={{ my: 0, fontWeight: 'bold', }}>{cat.name}</Typography>
                                            <br />
                                            <Typography color='text.secondary' sx={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                display: "-webkit-box",
                                                "WebkitLineClamp": '1',
                                                "WebkitBoxOrient": "vertical"
                                            }}
                                                variant='span'
                                            >

                                                {cat.description}
                                            </Typography>

                                        </TableCell>
                                        <TableCell>
                                            {projects?.find(p => p.id == cat.projectId).title}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Stack direction='row' alignItems='center' spacing={2}>
                                                <Avatar {...stringAvatar(creatorName)} />
                                                <Typography variant='subtitle2'> {creatorName}</Typography>
                                            </Stack>

                                        </TableCell>
                                        <TableCell>
                                            {new Date(cat.dateCreated).toLocaleString()}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={event => {
                                                setFocusedEntry(cat)
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
                        {emptyRows > 0 && (
                            <TableRow
                                style={{
                                    height: (53) * emptyRows,
                                }}
                            >
                                <TableCell colSpan={7} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                labelRowsPerPage="Eléments par page"
                                colSpan={6}
                                count={categories.length}
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
CategoriesTable.propTypes = {
    categories: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired,
    showEditDialog: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    showDetailsDialog: PropTypes.func.isRequired,
    showDeleteDialog: PropTypes.func.isRequired
}