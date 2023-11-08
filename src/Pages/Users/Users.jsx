import { Paper } from '@mui/material'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataContext } from '../../Contexts'
import { PageHeader } from '../../Components/PageHeader'
import { UsersTable } from './UsersTable'
import { CreateDialog } from './CreateDialog'
import { EditDialog } from './EditDialog'
import { DeleteDialog } from './DeleteDialog'
import { sortAndFilterData } from '../../utils'

export const Users = () => {
  // TODO: Add entry creation date and entry subscription date.

  const { sampleData, setSampleData } = useContext(DataContext)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [focusedEntry, setFocusedEntry] = useState(null)
  const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  useEffect(() => {
    setUsers(sampleData?.users || [])
  }, [sampleData])

  function createUser(user) {
    setSampleData(
      prev => ({ ...prev, users: [...prev.users, { ...user, id: sampleData.users.length + 1, password: '123abc' }] })
    )
  }

  const [tableOptions, setTableOptions] = useState({
    rowsPerPage: 5,
    page: 0,
    count: users.length,
    handlePageChange: setCurrentPage,
    handleRowsPerPageChange: changeRowsPerPage
  })
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
      editUser(entry)
    }
    setFocusedEntry(null)
    setIsEditDialogOpen(false)
  }
  function closeDeleteDialog(entry) {
    if (entry) {
      deleteUser(entry)
    }
    setFocusedEntry(null)
    setIsDeleteDialogOpen(false)
  }
  function editUser(entry) {
    console.log(entry);
    setSampleData(prev => (
      { ...prev, users: prev.users.map(user => user.id == entry.id ? entry : user) }
    ))
  }
  function deleteUser(entry) {
    console.log(entry);
    setSampleData(prev => (
      { ...prev, users: prev.users.filter(user => user.id != entry.id) }
    ))
  }
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
        users={sortAndFilterData(sampleData.users, searchTerm, tableOptions.sortOption || "")}
        options={({ ...tableOptions, handlePageChange, handleRowsPerPageChange })}
        showEditDialog={showEditDialog}
        showDeleteDialog={showDeleteDialog}
      />
      <CreateDialog open={isCreateDialogOpen} handleClose={(user) => {
        if (user) {
          createUser(user)
        }
        setIsCreateDialogOpen(false)
      }} />
      {focusedEntry && <EditDialog open={isEditDialogOpen} entry={focusedEntry} handleClose={closeEditDialog} />}
      {focusedEntry && <DeleteDialog open={isDeleteDialogOpen} entry={focusedEntry} handleClose={closeDeleteDialog} />}

    </Paper >
  )
}
