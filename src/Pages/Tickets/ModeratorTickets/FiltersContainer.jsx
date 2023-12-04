import { RestartAlt } from "@mui/icons-material"
import { Box, Button, Checkbox, FormControlLabel, Link, Stack, TextField, Typography } from "@mui/material"
import { PriorityDot } from "../../../Components/PriorityDot"
import { TICKET_PRIORITY, TICKET_STATUS } from "../../../utils"
import { StatusDot } from "../../../Components/StatusDot"
import { useTheme } from "@emotion/react"
import { useState } from "react"
import { SelectListDialog } from "./SelectListDialog"
import PropTypes from "prop-types"
export const FiltersContainer = ({ agents, customers }) => {
    let theme = useTheme()
    const [isAddAgentsDialogOpen, setIsAddAgentsDialogOpen] = useState(false)
    const MAX_DISPLAYED_ENTRIES = 3
    let resetBtnColor = theme.palette.primary.light
    const [filters, setFilters] = useState({
        startDate: null,
        endDate: null,
        includeClosedTickets: false,
        agentIds: [],
        customerIds: [],
        statuses: [],
        priorities: []
    })
    console.log(isAddAgentsDialogOpen)
    function closeAddAgentsDialog() {
        setIsAddAgentsDialogOpen(false)
    }
    console.log(filters)
    return (
        <Stack>
            <Stack direction='row' mb={2} justifyContent='space-between'>
                <Typography variant="h5" fontWeight='bold'>Filtrer les tickets</Typography>
                <Button variant="outlined" size="small" sx={{ color: resetBtnColor }}><RestartAlt sx={{ color: resetBtnColor }} /></Button>
            </Stack>
            <Stack direction='row' mb={1} justifyContent='space-between'>

                <Typography variant="body1" fontWeight='bold'>Filtrer par date</Typography>
                <Button variant="outlined" size="small" sx={{ color: resetBtnColor }}><RestartAlt sx={{ color: resetBtnColor }} /></Button>
            </Stack>
            <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between'>
                <Typography variant="subtitle2">Du</Typography>
                <TextField id="start-date" type="date" value={filters.startDate}
                    onChange={event => setFilters(prev => ({ ...prev, startDate: event.target.value }))}
                    size='small' aria-label="Du" variant="outlined" />
                <Typography variant="subtitle2">Au</Typography>
                <TextField id="end-date" type="date" value={filters.endDate}
                    onChange={event => setFilters(prev => ({ ...prev, endDate: event.target.value }))}
                    aria-label="Au" size='small' variant="outlined" />
            </Stack>
            <FormControlLabel
                control={
                    <Checkbox name="showClosed" checked={filters.includeClosedTickets}
                        onChange={() => setFilters(
                            prev => ({ ...prev, includeClosedTickets: !prev.includeClosedTickets }))
                        } />
                }
                label="Inclure les tickets fermés"
                sx={{ marginBottom: '1em' }}
            />
            <Stack direction='row' mb={1} justifyContent='space-between'>

                <Typography variant="body1" fontWeight='bold'>Filtrer par agent</Typography>
                <Button variant="outlined" size="small" sx={{ color: resetBtnColor }}><RestartAlt sx={{ color: resetBtnColor }} /></Button>
            </Stack>
            <TextField id="search-by-agent"
                size="small" aria-label="Filtrer par agent"
                label="Recherche agent" variant="outlined" sx={{ marginBottom: '1em' }} />
            <Stack mb={2} >
                {agents?.slice(0, MAX_DISPLAYED_ENTRIES)
                    .map(agent => <FormControlLabel key={`agent-${agent.id}`} sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                        control={
                            <Checkbox name="showClosed" />
                        }
                        label={agent.firstName + " " + agent.lastName}
                    />
                    )}

                {agents.length > MAX_DISPLAYED_ENTRIES &&
                    <>
                        <Link sx={{ cursor: 'pointer' }}
                            onClick={() => setIsAddAgentsDialogOpen(true)}
                        >{agents?.length - MAX_DISPLAYED_ENTRIES} de plus</Link>
                        <SelectListDialog
                            entries={agents.map(agent => ({ ...agent, fullName: `${agent.firstName} ${agent.lastName}` }))}
                            keyField='id' labelField='fullName'
                            placeholder={"Nom Complet"}
                            open={isAddAgentsDialogOpen}
                            handleClose={closeAddAgentsDialog} title={'Choisir les agents a inclure'} />
                    </>
                }
            </Stack>

            <Stack direction='row' mb={1} justifyContent='space-between'>

                <Typography variant="body1" fontWeight='bold'>Filtrer par client</Typography>
                <Button variant="outlined" size="small" sx={{ color: resetBtnColor }}><RestartAlt sx={{ color: resetBtnColor }} /></Button>
            </Stack>
            <TextField id="search-by-client"
                size="small" aria-label="Filtrer par client"
                label="Recherche client" variant="outlined" sx={{ marginBottom: '1em' }} />
            <Stack mb={2} >
                <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                    control={
                        <Checkbox name="showClosed" />
                    }
                    label="Client 001"
                />
                <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                    control={
                        <Checkbox name="showClosed" />
                    }
                    label="Client 005"
                />
                <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                    control={
                        <Checkbox name="showClosed" />
                    }
                    label="Client 007"
                />
                <Link>5 de plus</Link>
            </Stack>
            <Stack direction='row' mb={1} justifyContent='space-between'>

                <Typography variant="body1" fontWeight='bold'>Priorité et statut</Typography>
                <Button variant="outlined" size="small" color="primary"><RestartAlt sx={{ color: resetBtnColor }} /></Button>
            </Stack>
            <Stack direction='row'>
                <Box sx={{ width: '50%' }}>
                    <Typography variant="body1" fontWeight='bold'>Statut</Typography>
                    <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                        control={
                            <Checkbox name="showClosed" />
                        }
                        label={
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <StatusDot type={TICKET_STATUS.PENDING} />
                                <Typography variant="body1" >En attente</Typography>
                            </Stack>}
                    />
                    <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                        control={
                            <Checkbox name="showClosed" />
                        }
                        label={
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <StatusDot type={TICKET_STATUS.PROCESSED} />
                                <Typography variant="body1" >Traité</Typography>
                            </Stack>}
                    />
                    <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                        control={
                            <Checkbox name="showClosed" />
                        }
                        label={
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <StatusDot type={TICKET_STATUS.REJECTED} />
                                <Typography variant="body1" >Rejeté</Typography>
                            </Stack>}
                    />
                </Box>
                <Box sx={{ width: '50%' }}>
                    <Typography variant="body1" fontWeight='bold'>Priorité</Typography>
                    <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                        control={
                            <Checkbox name="showClosed" />
                        }
                        label={
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <PriorityDot type={TICKET_PRIORITY.CRITICAL} />
                                <Typography variant="body1" >Critique</Typography>
                            </Stack>}
                    />
                    <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                        control={
                            <Checkbox name="showClosed" />
                        }
                        label={
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <PriorityDot type={TICKET_PRIORITY.HIGH} />
                                <Typography variant="body1" >Haute</Typography>
                            </Stack>}
                    />
                    <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                        control={
                            <Checkbox name="showClosed" />
                        }
                        label={
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <PriorityDot type={TICKET_PRIORITY.NORMAL} />
                                <Typography variant="body1" >Normale</Typography>
                            </Stack>}
                    />
                </Box>
            </Stack>

        </Stack>

    )
}
FiltersContainer.propTypes = {
    agents: PropTypes.array,
    customers: PropTypes.array
}