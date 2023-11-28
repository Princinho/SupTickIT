import { AddCircleOutline, ArrowBack, ArrowForward, HighlightOff, Search } from '@mui/icons-material'
import { Box, Button, ButtonGroup, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'

import { useContext, useState } from 'react'
import { createTicket, deleteTicket, editTicket, getAllCategories, getAllProjects, getAllUsers, getCustomerTickets } from '../../../Api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { sortAndFilterData } from '../../Companies/utils'
// import { CreateDialog } from './CreateDialog'
// import { EditDialog } from './EditDialog'
// import { DeleteDialog } from './DeleteDialog'
// import { DetailsDialog } from './DetailsDialog'
import { UserContext } from '../../../Contexts'
import { ModeratorTicketsTable } from './ModeratorTicketsTable'
import { ModeratorTicketDetailsDialog } from './ModeratorTicketDetailsDialog'

export const ModeratorTickets = () => {

  const { user } = useContext(UserContext)
  // const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(false)
  // const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [focusedEntry, setFocusedEntry] = useState(null)
  const [sortOption, setSortOption] = useState({ option: 'name' })
  const BASE_QUERY_KEY = 'tickets'
  // const [companies, setCompanies] = useState([])
  const queryClient = useQueryClient()
  const { data: tickets } = useQuery({ queryKey: [BASE_QUERY_KEY, user?.id], queryFn: () => getCustomerTickets(user?.id) })
  const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: getAllProjects })
  const { data: users } = useQuery({ queryKey: ['users'], queryFn: getAllUsers })
  const [tableOptions, setTableOptions] = useState({
    rowsPerPage: 5,
    page: 0,
    count: tickets?.length,
    handlePageChange: setCurrentPage,
    handleRowsPerPageChange: changeRowsPerPage
  })
  function changeRowsPerPage(rowsPerPage) {
    setRowsPerPage(rowsPerPage)
    setCurrentPage(0)
  }
  // function showEditDialog(entry) {
  //   setIsEditDialogOpen(true)
  //   setFocusedEntry(entry)
  // }
  function showDeleteDialog(entry) {
    setIsDeleteDialogOpen(true)
    setFocusedEntry(entry)
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
  console.log(focusedEntry)
  // const createMutation = useMutation({
  //   mutationFn: createTicket,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
  // })
  const editMutation = useMutation({
    mutationFn: editTicket,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
  })
  // const deleteMutation = useMutation({
  //   mutationFn: deleteTicket,
  //   onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
  // })

  return (
    <Paper sx={{ padding: '1em', paddingRight: 0, flexGrow: 1 }} elevation={2}>
      <Typography variant='h5' component='span' sx={{ fontWeight: 'bold' }}>Tous les tickets</Typography>
      <Stack direction='row' mb={2}>
        <Typography color='text.secondary' sx={{ fontWeight: 'bold' }}>Menu /</Typography>
        <Typography color='primary.light' sx={{ fontWeight: 'bold' }}>Tickets</Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Stack direction='row' alignItems='center' spacing={2}>
            {/* <Button variant='contained'
              onClick={() => setIsCreateDialogOpen(true)}
              startIcon={<AddCircleOutline />}
              sx={{
                color: 'white',
                background: (theme) => theme.palette.primary.light,
                textTransform: 'none'
              }}>Nouveau</Button> */}

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
              onChange={(event) => setSearchTerm(event.target.value)}
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
            }}
              variant='outlined'>
              <HighlightOff />
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ marginRight: '1em', mt: 2 }}>
        <ModeratorTicketsTable
          options={tableOptions}
          projects={projects}
          users={users}
          tickets={sortAndFilterData(tickets, searchTerm, sortOption)}
          showDetailsDialog={showDetailsDialog}
        // showEditDialog={showEditDialog}
        // showDeleteDialog={showDeleteDialog}
        />
      </Box>
      {/* <CreateDialog open={isCreateDialogOpen} handleClose={(entry) => {
        if (entry) {
          createMutation.mutate(entry)
        }
        setIsCreateDialogOpen(false)
      }} />

      {
        focusedEntry && <EditDialog open={isEditDialogOpen} entry={focusedEntry}
          handleClose={(entry) => {
            if (entry) { editMutation.mutate(entry) }
            setIsEditDialogOpen(false)
          }}

        />
      }
      
      {
        focusedEntry && <DeleteDialog open={isDeleteDialogOpen} entry={focusedEntry}
          handleClose={(entry) => {
            if (entry) { deleteMutation.mutate(entry) }
            setIsDeleteDialogOpen(false)
          }}

        />
      } */}
      {
        focusedEntry && <ModeratorTicketDetailsDialog open={isDetailsDialogOpen} entry={focusedEntry}
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
  )
}
