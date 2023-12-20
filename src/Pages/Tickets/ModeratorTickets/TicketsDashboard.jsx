import { ArrowBack, ArrowForward, HighlightOff, Search, Tune } from '@mui/icons-material'
import { Box, Button, ButtonGroup, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography, useMediaQuery } from '@mui/material'

import { useContext, useEffect, useRef, useState } from 'react'
import { editTicket, getAllProjects, getAllTickets, getAllUsers, isUserInRole } from '../../../Api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UserContext } from '../../../Contexts'
import { TicketsTable } from './TicketsTable'
import { TicketDetailsDialog } from './TicketDetailsDialog'
import { FiltersContainer } from './FiltersContainer'
import { SYSTEM_ROLES, TICKET_STATUS } from '../../../utils'
import { FiltersDialog } from './FiltersDialog'
import { useTheme } from '@emotion/react'

export const TicketsDashboard = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const ref = useRef({})
  const { user } = useContext(UserContext)
  const initialFilters = {
    startDate: null,
    endDate: null,
    includeClosedTickets: true,
    agentIds: [],
    customerIds: [],
    statuses: [],
    priorities: [],
    agentSearchTerm: '',
    customerSearchTerm: ''
  }
  console.log(ref)
  const [filters, setFilters] = useState(initialFilters)
  const [filteredTickets, setFilteredTickets] = useState([])
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [focusedEntry, setFocusedEntry] = useState(null)
  const [sortOption, setSortOption] = useState({ option: 'name' })
  const BASE_QUERY_KEY = 'moderator-tickets'
  const [isFiltersDialogOpen, setIsFiltersDialogOpen] = useState(false)
  // const [companies, setCompanies] = useState([])
  const queryClient = useQueryClient()
  const { data: tickets } = useQuery({ queryKey: [BASE_QUERY_KEY], queryFn: () => getAllTickets(user?.id) })
  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: getAllProjects })
  const { data: users } = useQuery({ queryKey: ['users'], queryFn: getAllUsers })
  const [tableOptions, setTableOptions] = useState({
    rowsPerPage: 5,
    page: 0,
    count: tickets?.length,
    handlePageChange: setCurrentPage,
    handleRowsPerPageChange: changeRowsPerPage
  })
  useEffect(() => setFilteredTickets(tickets), [tickets])
  function resetFilters() {
    setFilters(initialFilters)
  }
  function changeRowsPerPage(rowsPerPage) {
    setRowsPerPage(rowsPerPage)
    setCurrentPage(0)
  }
  function showDetailsDialog(entry) {
    setIsDetailsDialogOpen(true)
    setFocusedEntry(entry)
  }
  function setRowsPerPage(rowsPerPage) {
    setTableOptions(prev => ({ ...prev, rowsPerPage }))
  }
  function setCurrentPage(page) {
    setTableOptions(prev => ({ ...prev, page }))
  }
  function getAvailableAgents() {
    return users?.filter(user => isUserInRole(SYSTEM_ROLES.AGENT, user.id))
  }
  function getTicketCustomers() {
    let ticketsCustomerIds = tickets?.reduce((prev, current) => {
      return prev.includes(current.createdBy) ? prev : [...prev, current.createdBy]
    }, [])
    return ticketsCustomerIds?.map(id => users?.find(user => user.id == id))
  }
  function filterBySearchTerm(event) {
    const newFilters = { ...filters, searchTerm: event.target.value }
    setFilters(newFilters)
    applyFilters(newFilters)
  }

  function applyFilters(updatedFilters) {
    if (!tickets) {
      return []
    }

    let newFilteredTickets = [...tickets]
    if (updatedFilters?.startDate) newFilteredTickets = newFilteredTickets.filter(
      t => new Date(t.dateCreated) > new Date(updatedFilters.startDate)
    )
    if (updatedFilters?.endDate) newFilteredTickets = newFilteredTickets.filter(
      t => new Date(t.dateCreated) < new Date(updatedFilters.endDate)
    )
    if (!updatedFilters.includeClosedTickets) {
      newFilteredTickets = newFilteredTickets.filter(ticket => ticket.status != TICKET_STATUS.CLOSED)
    }
    if (updatedFilters.agentIds?.length > 0) {
      newFilteredTickets = newFilteredTickets.filter(ticket => updatedFilters.agentIds.includes(ticket.agentId))
    }
    if (updatedFilters.customerIds?.length > 0) {
      newFilteredTickets = newFilteredTickets.filter(ticket => updatedFilters.customerIds.includes(ticket.createdBy))
    }
    if (updatedFilters.priorities?.length > 0) {
      newFilteredTickets = newFilteredTickets.filter(ticket => updatedFilters.priorities.includes(ticket.priority))
    }
    if (updatedFilters.statuses?.length > 0) {
      newFilteredTickets = newFilteredTickets.filter(ticket => updatedFilters.statuses.includes(ticket.status))
    }
    if (filters.searchTerm) {
      newFilteredTickets = newFilteredTickets.filter(
        ticket => ticket.name.toLowerCase().includes(filters.searchTerm.toLowerCase())
          || ticket.description.toLowerCase().includes(filters.searchTerm.toLowerCase()))
    }
    console.log(newFilteredTickets)
    // setFilters(updatedFilters)
    setFilteredTickets(newFilteredTickets)
    return newFilteredTickets
  }
  const editMutation = useMutation({
    mutationFn: editTicket,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
  })

  return (<>
    <Grid container spacing={2}>
      <Grid item xs={12} lg={9}>
        <Paper sx={{ padding: '1em', paddingRight: 0, flexGrow: 1 }} elevation={2}>
          <Typography variant='h5' component='span' sx={{ fontWeight: 'bold' }}>Tous les tickets</Typography>
          <Stack direction='row' mb={2}>
            <Typography color='text.secondary' sx={{ fontWeight: 'bold' }}>Menu /</Typography>
            <Typography color='primary.light' sx={{ fontWeight: 'bold' }}>Tickets</Typography>
          </Stack>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={5}>
              <Stack direction='row' alignItems='center' spacing={2}>


                <FormControl sx={{ minWidth: { xs: '85%', sm: '60%' } }} size='small'>
                  <InputLabel id="demo-simple-select-label">Trier par</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Options"
                    value={sortOption?.option}
                    onChange={event => setSortOption({ option: event.target.value })}
                  >
                    <MenuItem value={'name'}>Nom</MenuItem>
                    <MenuItem value={'id'}>Id</MenuItem>
                    {/* <MenuItem value={'dateCreated'}>Date</MenuItem> */}

                  </Select>
                </FormControl>
              </Stack>

            </Grid>
            <Grid item xs={12} sm={7}>
              <Stack direction='row' width='100%' spacing={{ xs: 1, sm: 2 }} justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}>
                <TextField
                  id="companies-index-search-box" size='small'
                  sx={{ minWidth: { xs: '30%', sm: '50%' } }}
                  onChange={filterBySearchTerm}
                  aria-label='search'
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                />

                <FormControl sx={{ minWidth: '15%' }} size='small'>
                  <InputLabel id="demo-simple-select-label">Eléments</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Options"
                    value={tableOptions.rowsPerPage}
                    onChange={event => changeRowsPerPage(event.target.value)}
                  >
                    <MenuItem value={-1}>All</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>

                  </Select>
                </FormControl>

                <ButtonGroup variant="outlined" aria-label="outlined primary button group">
                  <Button
                    disabled={tableOptions.page == 0}
                    sx={{ backgroundColor: 'white', color: (theme) => theme.palette.text.secondary }}
                    onClick={() => setCurrentPage(tableOptions.page - 1)}
                  ><ArrowBack /></Button>
                  <Button
                    disabled={tableOptions.page >= Math.ceil(tableOptions.count / tableOptions.rowsPerPage) - 1}
                    onClick={() => setCurrentPage(tableOptions.page + 1)}
                    sx={{ backgroundColor: 'white', color: (theme) => theme.palette.text.secondary }}><ArrowForward /></Button>
                </ButtonGroup>
                <IconButton onClick={() => setIsFiltersDialogOpen(true)} sx={{ display: { lg: 'none' } }}><Tune /></IconButton>
                <Button sx={{
                  backgroundColor: 'white', color: (theme) => theme.palette.primary.light,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderTopLeftRadius: '50%',
                  borderBottomLeftRadius: '50%',
                  padding: 0,
                  minWidth: '42px', paddingInline: '10px',
                  borderRight: 'none',
                  '&:hover': { borderRight: 'none' }
                }} onClick={() => {
                  console.log('clieks')
                  resetFilters()
                }}
                  variant='outlined'>
                  <HighlightOff />
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ marginRight: '1em', mt: 2 }}>

            <TicketsTable
              options={tableOptions}
              projects={projects}
              users={users}
              tickets={filteredTickets}
              showDetailsDialog={showDetailsDialog}
            />
          </Box>

          {
            focusedEntry && <TicketDetailsDialog open={isDetailsDialogOpen} entry={focusedEntry}
              handleClose={(ticket) => {
                if (ticket) {
                  console.log(ticket)
                  editMutation.mutate(ticket)
                }
                setIsDetailsDialogOpen(false)
              }}

            />
          }
        </Paper >
      </Grid>
      <Grid item xs={0} lg={3} >
        {!isSmallScreen && <Paper sx={{ width: '100%', minHeight: '40vh', padding: '1em', display: { xs: 'none', lg: 'block' } }}>
          <FiltersContainer
            agents={getAvailableAgents()}
            filters={filters}
            initialFilters={initialFilters}
            setFilters={setFilters}
            ref={ref}
            customers={getTicketCustomers()}
            applyFilters={(filters) => applyFilters(filters)} />
        </Paper>}
      </Grid>
    </Grid>
    <FiltersDialog agents={getAvailableAgents()}
      open={isFiltersDialogOpen}
      customers={getTicketCustomers()}
      filters={filters}

      ref={ref}
      initialFilters={initialFilters}
      setFilters={setFilters}
      handleClose={(newFilters) => {
        console.log(newFilters)
        setIsFiltersDialogOpen(false)
        if (newFilters) {
          setFilters(newFilters)
          applyFilters(filters)
        }
      }} />

  </>
  )
}
