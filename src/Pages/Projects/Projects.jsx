import { ArrowBack, ArrowForward, HighlightOff, Search } from '@mui/icons-material'
import { Box, Button, ButtonGroup, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { ProjectsTable } from './ProjectsTable'
import {  useContext, useState } from 'react'
import { CreateDialog } from './CreateDialog'
import { EditDialog } from './EditDialog'
import { DeleteDialog } from './DeleteDialog'
import { sortAndFilterData } from './utils'
import { DetailsDialog } from './DetailsDialog'
import { DataContext } from '../../Contexts'

export const Projects = () => {
  
  const { sampleData } = useContext(DataContext)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [projectToEdit, setProjectToEdit] = useState(null)
  const [projectToDetail, setProjectToDetail] = useState(null)
  const [projectToDelete, setProjectToDelete] = useState(null)
  const [sortOption, setSortOption] = useState({option:'title'})
  const [projects, setProjects] = useState([...sampleData.projects])
  const [tableOptions, setTableOptions] = useState({
    rowsPerPage: 5,
    page: 0,
    count: sampleData.projects.length,
    handlePageChange: setCurrentPage,
    handleRowsPerPageChange: changeRowsPerPage
  })
  function changeRowsPerPage(rowsPerPage) {
    setRowsPerPage(rowsPerPage)
    setCurrentPage(0)
  }
  function showEditDialog(project) {
    setIsEditDialogOpen(true)
    setProjectToEdit(project)
  }
  function showDeleteDialog(project) {
    setIsDeleteDialogOpen(true)
    setProjectToDelete(project)
  }
  function showDetailsDialog(project) {
    setIsDetailsDialogOpen(true)
    setProjectToDetail(project)
  }
  function createProject(data) {
    setProjects(prev => {
      let result = [{ ...data, id: projects.length + 1, dateCreated: new Date().toISOString(), createdBy: 3 }, ...prev]
      return result
    })
  }
  function setRowsPerPage(rowsPerPage) {
    setTableOptions(prev => ({ ...prev, rowsPerPage }))
  }
  function setCurrentPage(page) {
    setTableOptions(prev => ({ ...prev, page }))
  }
  function editProject(app) {
    setProjects(prev => prev.map(
      prevApp => prevApp.id == app.id ? { ...prevApp, ...app } : prevApp
    ))
  }
  function deleteProject(project) {
    setProjects(prev => prev.filter(app => app.id != project.id))
  }
  return (
    <Paper sx={{ padding: '1em', paddingRight: 0, flexGrow: 1 }} elevation={2}>
      <Typography variant='h5' component='span' sx={{ fontWeight: 'bold' }}>Projets</Typography>
      <Stack direction='row'><Typography color='text.secondary' sx={{ fontWeight: 'bold' }}>Menu /</Typography><Typography color='primary.light' sx={{ fontWeight: 'bold' }}>Projets</Typography></Stack>

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
              id="projects-index-search-box" size='small'
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
        <ProjectsTable
          options={tableOptions}
          projects={sortAndFilterData(projects, searchTerm, sortOption)}
          showDetailsDialog={showDetailsDialog}
          showEditDialog={showEditDialog}
          showDeleteDialog={showDeleteDialog} />
      </Box>
      <CreateDialog open={isCreateDialogOpen} handleClose={(app) => {
        if (app) {
          createProject(app)
        }
        setIsCreateDialogOpen(false)
      }} />
      {
        projectToEdit && <EditDialog open={isEditDialogOpen} project={projectToEdit}
          handleClose={(app) => {
            if (app) { editProject(app) }
            setIsEditDialogOpen(false)
          }}

        />
      }
      {
        projectToDetail && <DetailsDialog open={isDetailsDialogOpen} project={projectToDetail}
          handleClose={() => {
            setIsDetailsDialogOpen(false)
          }}

        />
      }
      {
        projectToDelete && <DeleteDialog open={isDeleteDialogOpen} project={projectToDelete}
          handleClose={(app) => {
            if (app) { deleteProject(app) }
            setIsDeleteDialogOpen(false)
          }}

        />
      }

    </Paper >
  )
}
