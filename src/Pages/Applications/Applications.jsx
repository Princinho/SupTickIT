import { ArrowBack, ArrowForward, HighlightOff, Search } from '@mui/icons-material'
import { Box, Button, ButtonGroup, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { ApplicationsTable } from './ApplicationsTable'
import { useState } from 'react'
import { CreateDialog } from './CreateDialog'
import { sampleData } from '../../SampleData'
import { EditDialog } from './EditDialog'
import { DeleteDialog } from './DeleteDialog'
import { sortAndFilterData } from './utils'

//TODO: Faire bosser le tri
export const Applications = () => {
  //TODO: Corriger le bug quand on clique sur annuler sur le popup de creation
  //TODO: Ajouter un popup de details qui s'affiche quand on clique sur le nom de l'application
  //TODO: Faire bosser la pagination
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [applicationToEdit, setApplicationToEdit] = useState(null)
  const [applicationToDelete, setApplicationToDelete] = useState(null)
  const [sortOption, setSortOption] = useState(null)
  const [applications, setApplications] = useState([...sampleData.applications])
  const [tableOptions, setTableOptions] = useState({
    rowsPerPage: 5,
    page: 0,
    count: sampleData.applications.length,
    handlePageChange: setCurrentPage,
    handleRowsPerPageChange: changeRowsPerPage
  })
  function changeRowsPerPage(rowsPerPage) {
    setRowsPerPage(rowsPerPage)
    setCurrentPage(0)
  }
  function showEditDialog(application) {
    setIsEditDialogOpen(true)
    setApplicationToEdit(application)
  }
  function showDeleteDialog(application) {
    setIsDeleteDialogOpen(true)
    setApplicationToDelete(application)
  }
  function createApplication(data) {
    setApplications(prev => {
      let result = [{ ...data, id: applications.length + 1, dateCreated: new Date().toISOString(), createdBy: 3 }, ...prev]
      return result
    })
  }
  function setRowsPerPage(rowsPerPage) {
    setTableOptions(prev => ({ ...prev, rowsPerPage }))
  }
  function setCurrentPage(page) {
    console.log(page)
    setTableOptions(prev => ({ ...prev, page }))
  }
  function editApplication(app) {
    setApplications(prev => prev.map(
      prevApp => prevApp.id == app.id ? { ...prevApp, ...app } : prevApp
    ))
  }
  function deleteApplication(application) {
    setApplications(prev => prev.filter(app => app.id != application.id))
  }

  console.log(sortOption)

  return (
    <Paper sx={{ padding: '1em', paddingRight: 0, flexGrow: 1 }} elevation={2}>
      <Typography variant='h5' component='span' sx={{ fontWeight: 'bold' }}>Applications</Typography>
      <Stack direction='row'><Typography color='text.secondary' sx={{ fontWeight: 'bold' }}>Menu /</Typography><Typography color='primary.light' sx={{ fontWeight: 'bold' }}>Applications</Typography></Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Stack direction='row' alignItems='center' spacing={2}>
            <Button variant='contained'
              onClick={() => setIsCreateDialogOpen(true)}
              sx={{
                color: 'white',
                background: (theme) => theme.palette.primary.light,
                textTransform: 'none'
              }}>Ajouter</Button>

            <FormControl sx={{ minWidth: '40%' }} size='small'>
              <InputLabel id="demo-simple-select-label">Trier par</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Options"
                value={sortOption?.option}
                onChange={event => setSortOption({ option: event.target.value })}
              >
                <MenuItem value={'title'}>Nom</MenuItem>
                <MenuItem value={'id'}>Id</MenuItem>
                <MenuItem value={'dateCreated'}>Date</MenuItem>

              </Select>
            </FormControl>
          </Stack>

        </Grid>
        <Grid item xs={12} sm={7}>
          <Stack direction='row' width='100%' spacing={{ xs: 1, sm: 2 }} justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}>
            <TextField
              id="applications-index-search-box" size='small'
              sx={{ minWidth: '30%' }}
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
            {/* TODO: Synchroniser avec la pagniation du table footer */}

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
        <ApplicationsTable
          options={tableOptions}
          applications={sortAndFilterData(applications, searchTerm, sortOption)}

          showEditDialog={showEditDialog} showDeleteDialog={showDeleteDialog} />
      </Box>
      <CreateDialog open={isCreateDialogOpen} handleClose={(app) => {
        console.log(app)
        if (app) {
          createApplication(app)
        }
        setIsCreateDialogOpen(false)
      }} />
      {
        applicationToEdit && <EditDialog open={isEditDialogOpen} application={applicationToEdit}
          handleClose={(app) => {
            if (app) { editApplication(app) }
            setIsEditDialogOpen(false)
          }}

        />
      }
      {
        applicationToDelete && <DeleteDialog open={isDeleteDialogOpen} application={applicationToDelete}
          handleClose={(app) => {
            if (app) { deleteApplication(app) }
            setIsDeleteDialogOpen(false)
          }}

        />
      }

    </Paper >
  )
}
