import { Chip, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, Typography } from '@mui/material'

import PropTypes from 'prop-types'
import { TicketStatus } from '../../../Components/TicketStatus'
import { PriorityTag } from '../../../Components/PriorityTag'
import dayjs from 'dayjs'
import { timeSince } from '../../Companies/utils'

export const TicketsTable = ({ tickets, users, showDetailsDialog, options }) => {
    

    dayjs.locale('fr')
    const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } = options
    return (
            <TableContainer>

                <Table sx={{ minWidth: 320 }} size='small' aria-label="list of projects">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Aperçu</TableCell>
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
                            ).map((ticket) => (
                                <TableRow onClick={() => showDetailsDialog(ticket)}
                                    key={'appli' + ticket.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 },cursor:'pointer' }}
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
                                        <TicketStatus status={ticket.status} />
                                    </TableCell>
                                    <TableCell>
                                        <PriorityTag priority={ticket.priority} size="small" />
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='subtitle2'>{timeSince(new Date(ticket?.dateCreated))}</Typography>
                                    </TableCell>

                                </TableRow>
                            )) :
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