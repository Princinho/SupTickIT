import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Stack, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import PropTypes from "prop-types"
import { getAllAgents, getAllCategories } from "../../../Api"
import { TicketStatus } from "../../../Components/TicketStatus"
export const TicketHistoryDialog = ({ open, handleClose, ticket, ticketLogs }) => {
    const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: getAllCategories })
    const { data: agents } = useQuery({ queryKey: ['agents'], queryFn: getAllAgents })
    console.log(agents)
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Historique du Ticket #{ticket?.id}</DialogTitle>
                <DialogContent>
                    {ticketLogs?.map(log => {
                        console.log(log)
                        return <Box key={`ticket-log-${log.id}`}>
                            <Typography>{new Date(log.date).toLocaleString()}</Typography>
                            {log.description && <Stack direction='row' spacing={1}><Typography fontWeight='bold'>Description: </Typography><Typography>{log.description}</Typography></Stack>}
                            {log.name && <Stack direction='row' spacing={1}><Typography fontWeight='bold'>Titre: </Typography><Typography>{log.name}</Typography></Stack>}
                            {log.categoryId && <Stack direction='row' spacing={1}><Typography fontWeight='bold'>Catégorie: </Typography>{categories?.find(c => c.id == log.categoryId).name}</Stack>}
                            {log.agentId && <Stack direction='row' spacing={1}><Typography fontWeight='bold'>Agent: </Typography><Typography>{agents?.find(c => c.id == log.agentId).firstname}</Typography></Stack>}
                            {log.status && <Stack direction='row' spacing={1}><Typography fontWeight='bold'>Statut: </Typography><TicketStatus status={log.status} /></Stack>}
                            {log.body && <Stack direction='row' spacing={1}><Typography fontWeight='bold'>Nouveau message: de {log.userFullName} </Typography><Typography>{log.body}</Typography></Stack>}
                            <Divider sx={{ marginBottom: 1, marginTop: 1 }} />
                        </Box>
                    })}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose()
                    }}>Fermer</Button>
                </DialogActions>
            </Dialog>
        </Box >
    )
}
TicketHistoryDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func.isRequired,
    ticket: PropTypes.object.isRequired,
    ticketLogs: PropTypes.array
}
