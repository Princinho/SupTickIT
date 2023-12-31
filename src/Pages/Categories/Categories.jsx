import { ArrowBack, ArrowForward, HighlightOff, Search } from '@mui/icons-material'
import { Box, Button, ButtonGroup, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { CategoriesTable } from './CategoriesTable'
import { useEffect, useState } from 'react'
import { CreateDialog } from './CreateDialog'
import { EditDialog } from './EditDialog'
import { DeleteDialog } from './DeleteDialog'
import { sortAndFilterData } from '../../utils'
import { DetailsDialog } from './DetailsDialog'
import { createCategory, deleteCategory, editCategory, getAllCategories, getAllProjects } from '../../Api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthorization } from '../../Hooks/useAuthorization'
import { useNavigate } from 'react-router-dom'

export const Categories = () => {
    const BASE_QUERY_KEY = 'categories'
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState(false)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
    const [categoryToEdit, setCategoryToEdit] = useState(null)
    const [categoryToDetail, setCategoryToDetail] = useState(null)
    const [categoryToDelete, setCategoryToDelete] = useState(null)
    const [sortOption, setSortOption] = useState({ option: 'name' })
    const { isUserAuthorized } = useAuthorization()
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { data: categories } = useQuery({ queryKey: [BASE_QUERY_KEY], queryFn: getAllCategories })
    const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: getAllProjects })
    const [tableOptions, setTableOptions] = useState({
        rowsPerPage: 5, page: 0, count: categories?.length, handlePageChange: setCurrentPage,
        handleRowsPerPageChange: changeRowsPerPage
    })


    useEffect(() => {
        if (!isUserAuthorized()) {
            navigate("/accessdenied")
        }
    }, [])

    function changeRowsPerPage(rowsPerPage) {
        setRowsPerPage(rowsPerPage)
        setCurrentPage(0)
    }
    function showEditDialog(category) {
        setIsEditDialogOpen(true)
        setCategoryToEdit(category)
    }
    function showDeleteDialog(category) {
        setIsDeleteDialogOpen(true)
        setCategoryToDelete(category)
    }
    function showDetailsDialog(category) {
        setIsDetailsDialogOpen(true)
        setCategoryToDetail(category)
    }
    // function createCategory(data) {
    //     setCategories(prev => {
    //         let result = [{ ...data, id: categories.length + 1, dateCreated: new Date().toISOString(), createdBy: user?.id }, ...prev]
    //         return result
    //     })
    // }
    function setRowsPerPage(rowsPerPage) {
        setTableOptions(prev => ({ ...prev, rowsPerPage }))
    }
    function setCurrentPage(page) {
        setTableOptions(prev => ({ ...prev, page }))
    }
    // function editCategory(cat) {
    //     setCategories(prevEntries => prevEntries.map(
    //         prevEntry => prevEntry.id == cat.id ? { ...prevEntry, ...cat } : prevEntry
    //     ))
    // }
    // function deleteCategory(category) {
    //     setCategories(prev => prev.filter(cat => cat.id != category.id))
    // }

    const createMutation = useMutation({
        mutationFn: createCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
    })
    const editMutation = useMutation({
        mutationFn: editCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
    })
    const deleteMutation = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
    })
    return (
        <Paper sx={{ padding: '1em', paddingRight: 0, flexGrow: 1 }} elevation={2}>
            <Typography variant='h5' component='span' sx={{ fontWeight: 'bold' }}>Catégories de ticket</Typography>
            <Stack direction='row'
                mb={2}><Typography color='text.secondary' sx={{ fontWeight: 'bold' }}>Menu /</Typography><Typography color='primary.light' sx={{ fontWeight: 'bold' }}>Catégories</Typography></Stack>

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
                                <MenuItem value={'name'}>Nom</MenuItem>
                                <MenuItem value={'id'}>Id</MenuItem>
                                <MenuItem value={'dateCreated'}>Date</MenuItem>

                            </Select>
                        </FormControl>
                    </Stack>

                </Grid>
                <Grid item xs={12} sm={7}>
                    <Stack direction='row' width='100%' spacing={{ xs: 1, sm: 2 }} justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}>
                        <TextField
                            id="categories-index-search-box" size='small'
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
                <CategoriesTable
                    options={tableOptions}
                    categories={sortAndFilterData(categories, searchTerm, sortOption)}
                    projects={projects}
                    showDetailsDialog={showDetailsDialog}
                    showEditDialog={showEditDialog}
                    showDeleteDialog={showDeleteDialog} />
            </Box>
            <CreateDialog open={isCreateDialogOpen} projects={projects}
                handleClose={(cat) => {
                    if (cat) {
                        createMutation.mutate(cat)
                    }
                    setIsCreateDialogOpen(false)
                }} />
            {
                categoryToEdit && <EditDialog open={isEditDialogOpen} projects={projects}
                    category={categoryToEdit}
                    handleClose={(cat) => {
                        if (cat) { editMutation.mutate(cat) }
                        setIsEditDialogOpen(false)
                    }}

                />
            }
            {
                categoryToDetail && <DetailsDialog open={isDetailsDialogOpen} category={categoryToDetail} project={projects.find(p => p.id == categoryToDetail?.projectId)}
                    handleClose={() => {
                        setIsDetailsDialogOpen(false)
                    }}

                />
            }
            {
                categoryToDelete && <DeleteDialog open={isDeleteDialogOpen} projects={projects}
                    category={categoryToDelete}
                    handleClose={(cat) => {
                        if (cat) { deleteMutation.mutate(cat) }
                        setIsDeleteDialogOpen(false)
                    }}

                />
            }

        </Paper >
    )
}
