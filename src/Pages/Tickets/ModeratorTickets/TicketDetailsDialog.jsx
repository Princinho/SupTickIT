import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Stack, Typography } from "@mui/material"
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from "react"
import { getAvailableAgents, getCompanyProjects } from "../../../Api"
import { UserContext } from "../../../Contexts"
import { DropdownSelector } from "../../../Components/DropdownSelector"
import { SYSTEM_LABELS, getAvailablePriorities } from "../../../utils"
import { TicketStatus } from "../../../Components/TicketStatus"
import { Link } from "react-router-dom"
import { OpenInNew } from "@mui/icons-material"
export const TicketDetailsDialog = ({ open, handleClose, entry }) => {
    const { user } = useContext(UserContext)
    const [formData, setFormData] = useState({ ...entry })
    useEffect(() => setFormData({ ...entry }), [entry])
    const [availableAgents, setAvailableAgents] = useState([])
    useEffect(() => {
        setAvailableAgents(getAvailableAgents(user?.companyId).map(
            agent => ({ id: agent.id, name: agent.firstname + " " + agent.lastname })
        ))
    }, [user])
    
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
                        {entry.productRef && <>
                            <Grid item xs={6}>
                                <Typography variant="span">{SYSTEM_LABELS.PRODUCT_REF}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="span">{entry.productRef}</Typography>
                            </Grid>
                        </>}
                        <Grid item xs={12}>
                            <Typography variant="span">Description</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            {entry.description}
                        </Grid>
                        <Grid item xs={6}>
                            <DropdownSelector label="Responsable Assigné" labelField="name"
                                size="small"
                                options={availableAgents}
                                defaultValue={entry?.agentId || ""}
                                handleChange={value => setFormData(prev => ({ ...prev, agentId: value }))}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <DropdownSelector label="Priorité" labelField="name"
                                size="small"
                                options={getAvailablePriorities()}
                                defaultValue={entry?.priority || ""}
                                handleChange={value => setFormData(prev => ({ ...prev, priority: value }))}
                            />
                        </Grid>

                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose()
                    }}>Fermer</Button>
                    <Button color="success" onClick={() => {
                        handleClose(formData)
                        setFormData(null)
                    }}>Enregistrer</Button>

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