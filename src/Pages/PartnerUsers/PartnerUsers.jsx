import { Paper, Stack, Typography } from '@mui/material'
import { useCallback, useContext, useEffect, useState } from 'react'
import { PageHeader } from '../../Components/PageHeader'
import { UsersTable } from './UsersTable'
import { CreateDialog } from './CreateDialog'
import { EditDialog } from './EditDialog'
import { DeleteDialog } from './DeleteDialog'
import { SYSTEM_ROLES, sortAndFilterData } from '../../utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createCustomer, deleteUser, editUser, getActiveRolesForUser, getAllCompanies, getCompanyUsers } from '../../Api'
import { useNavigate } from 'react-router-dom'
import { useAuthorization } from '../../Hooks/useAuthorization'
import { UserContext } from '../../Contexts'
import { RoleChip } from '../../Components/RoleChip'

export const PartnerUsers = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [focusedEntry, setFocusedEntry] = useState(null)
  // const [users, setUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const BASE_QUERY_KEY = 'users'
  const queryClient = useQueryClient()
  const { user } = useContext(UserContext)
  const { data: companyUsers } = useQuery({ queryKey: [BASE_QUERY_KEY, user?.companyId], queryFn: () => getCompanyUsers(user?.companyId) })
  const { data: companies } = useQuery({ queryKey: ['companies'], queryFn: getAllCompanies })
  const navigate = useNavigate()
  const { isUserAuthorized } = useAuthorization()

  const [tableOptions, setTableOptions] = useState({
    rowsPerPage: 5,
    page: 0,
    count: companyUsers?.length,
    handlePageChange: setCurrentPage,
    handleRowsPerPageChange: changeRowsPerPage
  })

  function getUsersWithRoles() {
    let result = companyUsers?.map(user => {
      let userRoles = getActiveRolesForUser(user.id)
      return { ...user, roles: userRoles }
    })
    return result
  }
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


  const createCustomerMutation = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY, user?.companyId] })
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
    }, onError: (e) => {
      console.warn(e)
    }
  })
  const editMutation = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY, user?.companyId] })
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
    }
  })
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY, user?.companyId] })
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
    }
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
        users={sortAndFilterData(getUsersWithRoles(), searchTerm, tableOptions.sortOption || "")}
        options={({ ...tableOptions, handlePageChange, handleRowsPerPageChange })}
        showEditDialog={showEditDialog}
        showDeleteDialog={showDeleteDialog}
      />
      <CreateDialog open={isCreateDialogOpen}
        companies={companies}
        handleClose={(user) => {
          if (user) {
            createCustomerMutation.mutate(user)

          }
          setIsCreateDialogOpen(false)
        }} />
      {focusedEntry && <EditDialog open={isEditDialogOpen} entry={focusedEntry} companies={companies} handleClose={closeEditDialog} />}
      {focusedEntry && <DeleteDialog open={isDeleteDialogOpen} entry={focusedEntry} handleClose={closeDeleteDialog} />}
      <Stack direction={{ md: 'row' }} gap={2} justifyContent='flex-end' padding={2}>
        <Stack direction='row' alignItems='center' gap={1}><RoleChip roleId={SYSTEM_ROLES.CUSTOMER} /><Typography variant='body2'>Client</Typography></Stack>
        <Stack direction='row' alignItems='center' gap={1}><RoleChip roleId={SYSTEM_ROLES.CUSTOMER_ADMIN} /><Typography variant='body2'>Administrateur client</Typography></Stack>
      </Stack>
    </Paper >
  )
}
