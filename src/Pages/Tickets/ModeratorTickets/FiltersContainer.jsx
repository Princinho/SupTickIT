import { RestartAlt } from "@mui/icons-material"
import { Box, Button, Checkbox, FormControlLabel, Link, Stack, TextField, Typography } from "@mui/material"
import { PriorityDot } from "../../../Components/PriorityDot"
import { TICKET_PRIORITY, TICKET_STATUS, formatToInput } from "../../../utils"
import { StatusDot } from "../../../Components/StatusDot"
import { useTheme } from "@emotion/react"
import { useEffect, useState } from "react"
import { SelectListDialog } from "./SelectListDialog"
import PropTypes from "prop-types"
export const FiltersContainer = ({ agents, customers, applyFilters, filters, setFilters, initialFilters }) => {

    let theme = useTheme()
    const [isAddAgentsDialogOpen, setIsAddAgentsDialogOpen] = useState(false)
    const [isAddCustomersDialogOpen, setIsAddCustomersDialogOpen] = useState(false)
    const MAX_DISPLAYED_ENTRIES = 3
    let resetBtnColor = theme.palette.primary.light
    function resetAllFilters() {
        setFilters(initialFilters)
    }
    function resetDates() {
        setFilters(prev => ({ ...prev, startDate: null, endDate: null }))
    }
    function resetAgents() {
        setFilters(prev => ({ ...prev, agentSearchTerm: '', agentIds: [] }))
    }
    function resetCustomers() {
        setFilters(prev => ({ ...prev, customerSearchTerm: '', customerIds: [] }))
    }
    function resetPriorities() {
        setFilters(prev => ({ ...prev, priorities: [] }))
    }
    function resetStatuses() {
        setFilters(prev => ({ ...prev, statuses: [] }))
    }
    useEffect(() => {

        if (applyFilters) applyFilters(filters)
    }, [filters])
    function closeAddAgentsDialog() {
        setIsAddAgentsDialogOpen(false)
    }
    function closeAddCustomersDialog() {
        setIsAddCustomersDialogOpen(false)
    }
    function togglePriority(priority) {
        setFilters(
            prev => ({
                ...prev, priorities: filters?.priorities?.includes(priority) ?
                    prev.priorities.filter(p => p != priority) :
                    [...prev.priorities, priority]
            })
        )
    }
    function toggleAgent(agentId) {
        setFilters(
            prev => ({
                ...prev, agentIds: filters?.agentIds?.includes(agentId) ?
                    prev.agentIds.filter(p => p != agentId) :
                    [...prev.agentIds, agentId]
            })
        )
    }
    function toggleCustomer(customerId) {
        setFilters(
            prev => ({
                ...prev, customerIds: filters?.customerIds?.includes(customerId) ?
                    prev.customerIds.filter(p => p != customerId) :
                    [...prev.customerIds, customerId]
            })
        )
    }
    function toggleStatus(status) {
        setFilters(
            prev => ({
                ...prev, statuses: filters?.statuses?.includes(status) ?
                    prev.statuses?.filter(p => p != status) :
                    [...prev.statuses, status]
            })
        )
    }
    return (
        <Stack>
            <Stack direction='row' mb={2} justifyContent='space-between'>
                <Typography variant="h5" fontWeight='bold'>Filtrer les tickets</Typography>
                <Button variant="outlined" size="small"
                    onClick={resetAllFilters}
                    sx={{ color: resetBtnColor }}><RestartAlt sx={{ color: resetBtnColor }} /></Button>
            </Stack>
            <Stack direction='row' mb={1} justifyContent='space-between'>

                <Typography variant="body1" fontWeight='bold'>Filtrer par date</Typography>
                <Button variant="outlined" size="small"
                    onClick={resetDates}
                    sx={{ color: resetBtnColor }}><RestartAlt sx={{ color: resetBtnColor }} /></Button>
            </Stack>
            <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between'>
                <Typography variant="subtitle2">Du</Typography>
                <TextField id="start-date" type="date" value={filters?.startDate ? formatToInput(new Date(filters?.startDate)) : ""}
                    onChange={event => setFilters(prev => ({ ...prev, startDate: event.target.value }))}
                    size='small' aria-label="Du" variant="outlined" />
                <Typography variant="subtitle2">Au</Typography>
                <TextField id="end-date" type="date" value={filters?.endDate ? formatToInput(new Date(filters?.endDate)) : ""}
                    onChange={event => setFilters(prev => ({ ...prev, endDate: event.target.value }))}
                    aria-label="Au" size='small' variant="outlined" />
            </Stack>
            <FormControlLabel
                control={
                    <Checkbox checked={filters?.includeClosedTickets}
                        onChange={() => setFilters(
                            prev => ({ ...prev, includeClosedTickets: !prev.includeClosedTickets }))
                        } />
                }
                label="Inclure les tickets fermés"
                sx={{ marginBottom: '1em' }}
            />
            <Stack direction='row' mb={1} justifyContent='space-between'>

                <Typography variant="body1" fontWeight='bold'>Filtrer par agent</Typography>
                <Button variant="outlined" size="small"
                    onClick={resetAgents}
                    sx={{ color: resetBtnColor }}><RestartAlt sx={{ color: resetBtnColor }} /></Button>
            </Stack>
            <TextField id="search-by-agent"
                size="small" aria-label="Filtrer par agent"
                value={filters.agentSearchTerm}
                onChange={(event) => { setFilters(prev => ({ ...prev, agentSearchTerm: event.target.value })) }}
                label="Recherche agent" variant="outlined" sx={{ marginBottom: '1em' }} />
            <Stack mb={2} >
                {agents?.filter(agent => filters.agentSearchTerm ? (agent.firstName + " " + agent.lastName).toLowerCase().includes(filters.agentSearchTerm.toLowerCase()) : true)
                    .slice(0, MAX_DISPLAYED_ENTRIES)
                    .map(agent => <FormControlLabel key={`agent-${agent.id}`} sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                        control={
                            <Checkbox checked={filters.agentIds.includes(agent.id)} onChange={() => toggleAgent(agent.id)} />
                        }
                        label={agent.firstName + " " + agent.lastName}
                    />
                    )}

                {agents?.length > MAX_DISPLAYED_ENTRIES &&
                    <>
                        <Link sx={{ cursor: 'pointer' }}
                            onClick={() => setIsAddAgentsDialogOpen(true)}
                        >{agents?.length - MAX_DISPLAYED_ENTRIES} de plus</Link>
                        <SelectListDialog
                            entries={agents.map(agent => ({ ...agent, fullName: `${agent.firstName} ${agent.lastName}` }))
                            }
                            keyField='id' labelField='fullName'
                            placeholder={"Nom Complet"}
                            open={isAddAgentsDialogOpen}
                            handleClose={closeAddAgentsDialog} title={'Choisir les agents a inclure'} />
                    </>
                }
            </Stack>

            {customers && <>
                <Stack direction='row' mb={1} justifyContent='space-between'>

                    <Typography variant="body1" fontWeight='bold'>Filtrer par client</Typography>
                    <Button variant="outlined" size="small"
                        onClick={resetCustomers}
                        sx={{ color: resetBtnColor }}><RestartAlt sx={{ color: resetBtnColor }} /></Button>
                </Stack>
                <TextField id="search-by-client"
                    size="small" aria-label="Filtrer par client"
                    value={filters.customerSearchTerm}
                    onChange={(event) => { setFilters(prev => ({ ...prev, customerSearchTerm: event.target.value })) }}
                    label="Recherche client" variant="outlined" sx={{ marginBottom: '1em' }} />
                <Stack mb={2} >
                    {customers?.filter(customer =>
                        filters.customerSearchTerm ? (customer.firstName + " " + customer.lastName).toLowerCase().includes(filters.customerSearchTerm.toLowerCase())
                            : true)
                        .slice(0, MAX_DISPLAYED_ENTRIES)
                        .map(customer => <FormControlLabel key={`customer-${customer.id}`} sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                            control={
                                <Checkbox checked={filters.customerIds.includes(customer.id)} onChange={() => toggleCustomer(customer.id)} />
                            }
                            label={customer.firstName + " " + customer.lastName}
                        />
                        )}

                    {customers?.length > MAX_DISPLAYED_ENTRIES &&
                        <>
                            <Link sx={{ cursor: 'pointer' }}
                                onClick={() => setIsAddCustomersDialogOpen(true)}
                            >{customers?.length - MAX_DISPLAYED_ENTRIES} de plus</Link>
                            <SelectListDialog
                                entries={customers.map(agent => ({ ...agent, fullName: `${agent.firstName} ${agent.lastName}` }))}
                                keyField='id' labelField='fullName'
                                placeholder={"Nom Complet"}
                                open={isAddCustomersDialogOpen}
                                handleClose={closeAddCustomersDialog} title={'Choisir les clients a inclure'} />
                        </>
                    }
                </Stack>
            </>}
            <Stack direction='row' mb={1} justifyContent='space-between'>

                <Typography variant="body1" fontWeight='bold'>Priorité et statut</Typography>
                <Button variant="outlined" size="small"
                    onClick={() => { resetPriorities(); resetStatuses() }}
                    color="primary"><RestartAlt sx={{ color: resetBtnColor }} /></Button>
            </Stack>
            <Stack direction='row'>
                <Box sx={{ width: '50%' }}>
                    <Typography variant="body1" fontWeight='bold'>Statut</Typography>
                    <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                        control={
                            <Checkbox checked={filters?.statuses?.includes(TICKET_STATUS.PENDING)}
                                onChange={() => toggleStatus(TICKET_STATUS.PENDING)}
                            />
                        }
                        label={
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <StatusDot type={TICKET_STATUS.PENDING} />
                                <Typography variant="body1" >Non démarré</Typography>
                            </Stack>}
                    />
                    <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                        control={
                            <Checkbox checked={filters?.statuses?.includes(TICKET_STATUS.PROCESSED)}
                                onChange={() => toggleStatus(TICKET_STATUS.PROCESSED)}
                            />
                        }
                        label={
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <StatusDot type={TICKET_STATUS.PROCESSED} />
                                <Typography variant="body1" >Traité</Typography>
                            </Stack>}
                    />
                    <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                        control={
                            <Checkbox checked={filters?.statuses?.includes(TICKET_STATUS.APPROVED)}
                                onChange={() => toggleStatus(TICKET_STATUS.APPROVED)}
                            />
                        }
                        label={
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <StatusDot type={TICKET_STATUS.APPROVED} />
                                <Typography variant="body1" >Satisfait</Typography>
                            </Stack>}
                    />
                    <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                        control={
                            <Checkbox checked={filters?.statuses?.includes(TICKET_STATUS.REJECTED)}
                                onChange={() => toggleStatus(TICKET_STATUS.REJECTED)}
                            />
                        }
                        label={
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <StatusDot type={TICKET_STATUS.REJECTED} />
                                <Typography variant="body1" >Insatisfait</Typography>
                            </Stack>}
                    />
                </Box>
                <Box sx={{ width: '50%' }}>
                    <Typography variant="body1" fontWeight='bold'>Priorité</Typography>
                    <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                        control={
                            <Checkbox checked={filters?.priorities?.includes(TICKET_PRIORITY.CRITICAL)}
                                onChange={() => togglePriority(TICKET_PRIORITY.CRITICAL)}
                            />
                        }
                        label={
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <PriorityDot type={TICKET_PRIORITY.CRITICAL} />
                                <Typography variant="body1" >Critique</Typography>
                            </Stack>}
                    />
                    <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                        control={
                            <Checkbox checked={filters?.priorities?.includes(TICKET_PRIORITY.HIGH)}
                                onChange={() => togglePriority(TICKET_PRIORITY.HIGH)}
                            />
                        }
                        label={
                            <Stack direction='row' alignItems='center' spacing={1}>
                                <PriorityDot type={TICKET_PRIORITY.HIGH} />
                                <Typography variant="body1" >Haute</Typography>
                            </Stack>}
                    />
                    <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                        control={
                            <Checkbox checked={filters?.priorities?.includes(TICKET_PRIORITY.NORMAL)}
                                onChange={() => togglePriority(TICKET_PRIORITY.NORMAL)}
                            />
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
    customers: PropTypes.array,
    applyFilters: PropTypes.func,
    setFilters: PropTypes.func,
    filters: PropTypes.object,
    initialFilters: PropTypes.object

}