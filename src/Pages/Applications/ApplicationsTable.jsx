import { Avatar, Button,  Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { sampleData } from '../../SampleData'
import { stringAvatar } from '../../utils'

export const ApplicationsTable = () => {
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
                    {sampleData.applications.map((app) => (
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
                                    "-webkit-line-clamp": '1',
                                    "-webkit-box-orient": "vertical"
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

                                <Button color='warning' size='small' variant='contained' sx={{ textTransform: 'none', mr: '.5em', mb: '.5em' }}>Modifier</Button>
                                <Button color='error' size='small' variant='contained' sx={{ textTransform: 'none', mr: '.5em', mb: '.5em' }}>Supprimer</Button>

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
