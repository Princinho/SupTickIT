import { Avatar, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'

import PropTypes from 'prop-types'
import { TicketStatus } from '../../../Components/TicketStatus'
import { PriorityTag } from '../../../Components/PriorityTag'
import dayjs from 'dayjs'
import { timeSince } from '../../Companies/utils'
import { stringAvatar } from '../../../utils'

export const TicketsTable = ({ tickets, users, showDetailsDialog, options }) => {
    const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } = options
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tickets.length) : 0;


    dayjs.locale('fr')
    return (
        <TableContainer>

            <Table sx={{ minWidth: 320 }} size='small' aria-label="list of projects">
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="left">Aperçu</TableCell>
                        <TableCell align="left">Client</TableCell>
                        <TableCell align="left">Statut</TableCell>
                        <TableCell align="left">Priorité</TableCell>
                        <TableCell align="left">Soumis il y a </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tickets.length > 0 ?
                        (rowsPerPage > 0
                            ? tickets.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : tickets
                        ).map((ticket) => {
                            const creator = users?.find(u => u.id == ticket.createdBy)
                            const creatorName = creator ? creator?.firstname + " " + creator?.lastname : "??"
                            return (
                                <TableRow onClick={() => showDetailsDialog(ticket)}
                                    key={'appli' + ticket.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, cursor: 'pointer' }}
                                    hover
                                >
                                    <TableCell component="th" scope="row">
                                        {ticket.id}
                                    </TableCell>
                                    <TableCell align="left" sx={{ cursor: 'pointer', maxWidth: '70%' }} width='40%'

                                    >

                                        <Typography variant='span' sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            "WebkitLineClamp": '1',
                                            "WebkitBoxOrient": "vertical",
                                            my: 0, fontWeight: 'bold',
                                        }}>{ticket.name}</Typography>
                                        <Typography color='text.secondary' sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            display: "-webkit-box",
                                            "WebkitLineClamp": '1',
                                            "WebkitBoxOrient": "vertical"
                                        }}
                                            variant='span'
                                        >

                                            {ticket.description}
                                        </Typography>

                                    </TableCell>

                                    <TableCell>
                                        <Stack direction='row' alignItems='center' spacing={2}>
                                            <Avatar {...stringAvatar(creatorName)} />
                                            <Typography variant='subtitle2'> {creatorName}</Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>
                                        <TicketStatus status={ticket.status} />
                                    </TableCell>
                                    <TableCell>
                                        <PriorityTag priority={ticket.priority} size="small" />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='subtitle2'>{timeSince(new Date(ticket?.dateCreated))}</Typography>
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
                            count={tickets.length}
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

    )
}
TicketsTable.propTypes = {
    tickets: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    options: PropTypes.object.isRequired,
    showDetailsDialog: PropTypes.func.isRequired,

}