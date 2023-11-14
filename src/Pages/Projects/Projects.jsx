import { ArrowBack, ArrowForward, Delete, Edit, HighlightOff, MoreVert, OpenInNew, Search } from '@mui/icons-material'
import { Avatar, Button, ButtonGroup, Divider, FormControl, Grid, IconButton, InputAdornment, InputLabel, ListItemIcon, Menu, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { useContext, useState } from 'react'
import { CreateDialog } from './CreateDialog'
import { EditDialog } from './EditDialog'
import { DeleteDialog } from './DeleteDialog'
import { sortAndFilterData } from './utils'
import { DetailsDialog } from './DetailsDialog'
import { DataContext } from '../../Contexts'
import { stringAvatar } from '../../utils'
import { createProject, deleteProject, editProject, getAllProjects } from '../../Api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
  const [anchorEl, setAnchorEl] = useState(null)
  const [focusedEntry, setFocusedEntry] = useState(null)
  const [sortOption, setSortOption] = useState({ option: 'title' })
  // const [projects, setProjects] = useState([])
  const BASE_QUERY_KEY='projects'
  const [tableOptions, setTableOptions] = useState({
    rowsPerPage: 5,
    page: 0,
    count: sampleData.projects.length,
    handlePageChange: setCurrentPage,
    handleRowsPerPageChange: changeRowsPerPage
  })
  const { data: projects } = useQuery({ queryKey: [BASE_QUERY_KEY], queryFn: getAllProjects })
  function handleClose() {
    setAnchorEl(null)
  }
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
  const queryClient = useQueryClient()
  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
  })

  const editMutation = useMutation({
    mutationFn: editProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
  })
  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
  })

  function setRowsPerPage(rowsPerPage) {
    setTableOptions(prev => ({ ...prev, rowsPerPage }))
  }
  function setCurrentPage(page) {
    setTableOptions(prev => ({ ...prev, page }))
  }

  console.log(projects)

  const appMoreMenuOpen = Boolean(anchorEl)
  return (
    <>
      <Paper sx={{ padding: '1em', paddingRight: 0, flexGrow: 1, marginBottom: '2em' }} elevation={2}>
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
        {/* <Box sx={{ marginRight: '1em', mt: 2 }}>
        <ProjectsTable
          options={tableOptions}
          projects={sortAndFilterData(projects, searchTerm, sortOption)}
          showDetailsDialog={showDetailsDialog}
          showEditDialog={showEditDialog}
          showDeleteDialog={showDeleteDialog} />
      </Box> */}


        <CreateDialog open={isCreateDialogOpen} handleClose={(app) => {
          if (app) {
            createMutation.mutate(app)
          }
          setIsCreateDialogOpen(false)
        }} />
        {
          projectToEdit && <EditDialog open={isEditDialogOpen} project={projectToEdit}
            handleClose={(app) => {
              if (app) { editMutation.mutate(app) }
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
              if (app) { deleteMutation.mutate(app) }
              setIsDeleteDialogOpen(false)
            }}

          />
        }

      </Paper >

      <Grid container alignItems='center' justifyContent='space-evenly' rowSpacing={2} >

        {
          sortAndFilterData(projects, searchTerm, sortOption).map(
            project => {
              const creator = sampleData.users.find(u => u.id == project.createdBy)
              const creatorName = creator ? creator.firstName + " " + creator.lastName : "??"
              return <Grid item component='paper' key={`proj-${project.id}`} >
                <Paper sx={{ width: { xs: '300px', md: '30vw' }, minHeight: '200px', padding: '1em' }}>
                  <Stack direction='row' justifyContent='space-between' alignItems='center'>
                    <Typography textAlign='left' variant='subtitle1' fontWeight='bold'>{project.title}</Typography>
                    <IconButton onClick={event => {
                      event.stopPropagation()
                      setFocusedEntry(project)
                      setAnchorEl(event.currentTarget)
                    }}

                    ><MoreVert /></IconButton>
                  </Stack>
                  <Typography textAlign='left' variant='subtitle1' color='text.secondary' sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    "WebkitLineClamp": '2',
                    "WebkitBoxOrient": "vertical"
                  }}>{project.description}</Typography>
                  <Divider />
                  <Stack direction='row' paddingBlock={1} alignItems='center' justifyContent='space-between'>
                    <Typography variant='subtitle2' color='text.secondary'>
                      {new Date(project.dateCreated).toDateString()}
                    </Typography>
                    <Stack direction='row-reverse' alignItems='center' spacing={1}>
                      <Avatar {...stringAvatar(creatorName)} />
                      <Typography variant='subtitle-2'>{creatorName}</Typography>
                    </Stack>
                  </Stack>
                  <Divider />
                  {sampleData.companies.some(c => c.projects?.includes(project.id)) ?
                    <>
                      <Typography variant='subtitle1' fontWeight='bold'>Participants</Typography>
                      <Typography variant="subtitle2">
                        {sampleData.companies.filter(company => company.projects?.includes(project?.id)).map(company => company.name).join(', ')}
                      </Typography>
                    </> :
                    <Typography variant='subtitle2'>Non deployé</Typography>
                  }
                </Paper>
              </Grid>
            }
          )
        }
      </Grid>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={appMoreMenuOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >

        <MenuItem onClick={() => {
          handleClose()
          showDetailsDialog(focusedEntry)
        }}>

          <ListItemIcon>
            <OpenInNew color='primary' fontSize='small' />
          </ListItemIcon>
          Détails
        </MenuItem>
        <MenuItem onClick={() => {
          handleClose()
          showEditDialog(focusedEntry)
        }}>

          <ListItemIcon>
            <Edit color='warning' fontSize='small' />
          </ListItemIcon>
          Modifier
        </MenuItem>
        <MenuItem onClick={() => {
          handleClose()
          showDeleteDialog(focusedEntry)
        }}>
          <ListItemIcon>
            <Delete color='error' fontSize="small" />
          </ListItemIcon>
          Supprimer
        </MenuItem>
      </Menu >
    </>
  )
}
