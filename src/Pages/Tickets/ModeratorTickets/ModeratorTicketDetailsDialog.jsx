import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material"
import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from "react"
import { getAvailableAgents, getCompanyProjects } from "../../../Api"
import { UserContext } from "../../../Contexts"
import { DropdownSelector } from "../../../Components/DropdownSelector"
import { getAvailablePriorities } from "../../../utils"
export const ModeratorTicketDetailsDialog = ({ open, handleClose, entry }) => {
    const { user } = useContext(UserContext)
    const [formData, setFormData] = useState({ ...entry })
    useEffect(() => setFormData({ ...entry }), [entry])
    const [availableAgents, setAvailableAgents] = useState([])
    useEffect(() => {
        setAvailableAgents(getAvailableAgents(user?.companyId).map(
            agent => ({ id: agent.id, name: agent.firstName + " " + agent.lastName })
        ))
    }, [user])
    console.log(availableAgents)
    console.log(formData)
    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Ticket #{entry.id}</DialogTitle>
                <DialogContent>
                    <Grid container direction='row' spacing={2} justifyContent='flex-start'>

                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight='bold'>{entry.name}</Typography>
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
                        <Grid item xs={6}>
                            <DropdownSelector label="Responsable" labelField="name"
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
ModeratorTicketDetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired
}