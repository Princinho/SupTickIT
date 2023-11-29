import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Typography } from "@mui/material"
import PropTypes from 'prop-types'
import { useContext } from "react"
import { getCompanyProjects } from "../../../Api"
import { UserContext } from "../../../Contexts"
import { TicketStatus } from "../../../Components/TicketStatus"
import { OpenInNew } from "@mui/icons-material"
import { Link } from "react-router-dom"
export const TicketDetailsDialog = ({ open, handleClose, entry }) => {
    const { user } = useContext(UserContext)

    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Ticket #{entry.id}</DialogTitle>
                <DialogContent>
                    <Grid container direction='row' spacing={2} justifyContent='flex-start'>

                        <Grid item xs={12}>
                            <Stack direction='row' justifyContent='space-between'>
                                <Typography variant="h6" fontWeight='bold'>{entry.name}</Typography>
                                <Link to={`${entry.id}`}>
                                    <OpenInNew sx={{ color: (theme) => theme.palette.primary.light }} />
                                </Link>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            <TicketStatus status={entry.status} />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="span">Projet {getCompanyProjects(user?.companyId).find(p => p.id == entry.projectId)?.title}</Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="span">Description</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {entry.description}
                        </Grid>

                    </Grid>

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
TicketDetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired
}