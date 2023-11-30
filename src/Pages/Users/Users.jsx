import { Paper } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { PageHeader } from '../../Components/PageHeader'
import { UsersTable } from './UsersTable'
import { CreateDialog } from './CreateDialog'
import { EditDialog } from './EditDialog'
import { DeleteDialog } from './DeleteDialog'
import { sortAndFilterData } from '../../utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createUser, deleteUser, editUser, getAllCompanies, getAllUsers } from '../../Api'
import { useNavigate } from 'react-router-dom'
import { useAuthorization } from '../../Hooks/useAuthorization'

export const Users = () => {
  // TODO: Add entry creation date and entry subscription date.

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [focusedEntry, setFocusedEntry] = useState(null)
  // const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const BASE_QUERY_KEY = 'users'
  const queryClient = useQueryClient()
  const { data: users } = useQuery({ queryKey: [BASE_QUERY_KEY], queryFn: getAllUsers })
  const { data: companies } = useQuery({ queryKey: ['companies'], queryFn: getAllCompanies })
  const navigate = useNavigate()
  const { isUserAuthorized } = useAuthorization()


  const [tableOptions, setTableOptions] = useState({
    rowsPerPage: 5,
    page: 0,
    count: users?.length,
    handlePageChange: setCurrentPage,
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

  function setRowsPerPage(rowsPerPage) {
    setTableOptions(prev => ({ ...prev, rowsPerPage }))
  }
  function setCurrentPage(page) {
    setTableOptions(prev => ({ ...prev, page }))
  }
  function showEditDialog(entry) {
    setFocusedEntry(entry)
    setIsEditDialogOpen(true)
  }
  function showDeleteDialog(entry) {
    setFocusedEntry(entry)
    setIsDeleteDialogOpen(true)
  }
  function closeEditDialog(entry) {
    if (entry) {
      editMutation.mutate(entry)
    }
    setFocusedEntry(null)
    setIsEditDialogOpen(false)
  }
  function closeDeleteDialog(entry) {
    if (entry) {
      deleteMutation.mutate(entry)
    }
    setFocusedEntry(null)
    setIsDeleteDialogOpen(false)
  }

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
  })
  const editMutation = useMutation({
    mutationFn: editUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
  })
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
  })
  function updateTableOptions(key, value) {
    setTableOptions(prev =>
      ({ ...prev, [key]: value }))
  }
  function handlePageChange(value) {
    updateTableOptions('page', value)
  }
  function handleRowsPerPageChange(value) {
    updateTableOptions('rowsPerPage', value)
  }
  console.log(isEditDialogOpen, isDeleteDialogOpen)
  return (
    <Paper sx={{ padding: '1em', paddingRight: 0, flexGrow: 1 }} elevation={2}>
      <PageHeader pageTitle={"Utilisateurs"} pagePath={["Menu"]}
        sortingOptions={[{ name: "id", label: 'Id' }, { name: "firstName", label: "Nom" }]}
        sortOption={tableOptions.sortOption}
        onSortingOptionChanged={(value) => updateTableOptions('sortOption', value)}
        onSearchTermChanged={useCallback((value) => setSearchTerm(value), [])}
        onPaginationChanged={handleRowsPerPageChange}
        onPageChanged={handlePageChange}
        currentPageIndex={tableOptions.page}
        itemsCount={tableOptions.count}
        rowsPerPage={tableOptions.rowsPerPage}
        onAddButtonClick={() => { setIsCreateDialogOpen(true) }}
      />

      <UsersTable
        users={sortAndFilterData(users, searchTerm, tableOptions.sortOption || "")}
        options={({ ...tableOptions, handlePageChange, handleRowsPerPageChange })}
        showEditDialog={showEditDialog}
        showDeleteDialog={showDeleteDialog}
      />
      <CreateDialog open={isCreateDialogOpen}
        companies={companies}
        handleClose={(user) => {
          if (user) {
            createMutation.mutate(user)
          }
          setIsCreateDialogOpen(false)
        }} />
      {focusedEntry && <EditDialog open={isEditDialogOpen} entry={focusedEntry} handleClose={closeEditDialog} />}
      {focusedEntry && <DeleteDialog open={isDeleteDialogOpen} entry={focusedEntry} handleClose={closeDeleteDialog} />}

    </Paper >
  )
}
