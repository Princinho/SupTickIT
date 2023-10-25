import { Avatar, Button, Hidden, IconButton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { sampleData } from '../../SampleData'
import { stringAvatar } from '../../utils'
import PropTypes from 'prop-types'
import { Delete, Edit } from '@mui/icons-material'

export const ApplicationsTable = ({ applications, showEditDialog, showDeleteDialog }) => {
    console.log(applications)
    return (
        <TableContainer>

            <Table sx={{ minWidth: 320 }} size='small' aria-label="list of applications">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="left">Aperçu</TableCell>
                        <TableCell align="left">Ajouté par</TableCell>
                        <TableCell align="left">{"Date d'ajout"}</TableCell>
                        <TableCell align="left">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {applications?.map((app) => (
                        <TableRow
                            key={'appli' + app.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {app.id}
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant='span' sx={{ my: 0, fontWeight: 'bold', }}>{app.title}</Typography>
                                <br />
                                <Typography color='text.secondary' sx={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    display: "-webkit-box", fontSize: '.9em',
                                    "WebkitLineClamp": '1',
                                    "WebkitBoxOrient": "vertical"
                                }}
                                    variant='span'
                                >

                                    {app.description}
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Stack direction='row' alignItems='center' spacing={2}>
                                    <Avatar {...stringAvatar(sampleData.users.find(u => u.id == app.createdBy)?.name)} />
                                    <Typography variant='subtitle2'> {sampleData.users.find(u => u.id == app.createdBy)?.name}</Typography>
                                </Stack>

                            </TableCell>
                            <TableCell>
                                {new Date().toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                                <Hidden lgDown>
                                    <Stack direction='row'>
                                        <Button color='warning' size='small' variant='contained'
                                            sx={{ textTransform: 'none', mr: '.5em', mb: '.5em' }}
                                            onClick={() => showEditDialog(app)}>
                                            Modifier
                                        </Button>
                                        <Button color='error' size='small' variant='contained'
                                            sx={{ textTransform: 'none', mr: '.5em', mb: '.5em' }}
                                            onClick={() => showDeleteDialog(app)}>
                                            Supprimer
                                        </Button>
                                    </Stack>

                                </Hidden>
                                <Hidden lgUp>
                                    <Stack direction='row'>
                                        <IconButton color='warning' size='small' aria-label='Modifier'
                                            sx={{ mr: '.5em', mb: '.5em' }}
                                            onClick={() => showEditDialog(app)}>
                                            <Edit />
                                        </IconButton>
                                        <IconButton color='error' size='small' aria-label='Supprimer'
                                            sx={{ mr: '.5em', mb: '.5em' }}
                                            onClick={() => showDeleteDialog(app)}>
                                            <Delete />
                                        </IconButton>
                                    </Stack>
                                </Hidden>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
ApplicationsTable.propTypes = {
    applications: PropTypes.array.isRequired,
    showEditDialog: PropTypes.func.isRequired,
    showDeleteDialog: PropTypes.func.isRequired
}