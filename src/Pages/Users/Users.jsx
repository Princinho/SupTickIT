import { Paper, Stack, Typography } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { PageHeader } from '../../Components/PageHeader'
import { UsersTable } from './UsersTable'
import { CreateDialog } from './CreateDialog'
import { EditDialog } from './EditDialog'
import { DeleteDialog } from './DeleteDialog'
import { SYSTEM_ROLES, sortAndFilterData } from '../../utils'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createUserAsync, deleteUserAsync, editUserAsync, getAllCompaniesAsync, getAllUsersAsync, resetPassword, runWithProgress } from '../../Api'
import { useNavigate } from 'react-router-dom'
import { useAuthorization } from '../../Hooks/useAuthorization'
import { RoleChip } from '../../Components/RoleChip'
import { ResetPasswordDialog } from './ResetPasswordDialog'


export const Users = () => {

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isResetPasswordDialogOpen, setIsResetPasswordDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [focusedEntry, setFocusedEntry] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const BASE_QUERY_KEY = 'users'
  const queryClient = useQueryClient()
  const { data: users } = useQuery({ queryKey: [BASE_QUERY_KEY], queryFn: getAllUsersAsync })
  const { data: companies } = useQuery({ queryKey: ['companies'], queryFn: getAllCompaniesAsync })
  const navigate = useNavigate()
  const { isUserAuthorized } = useAuthorization()
  const [roleFilter, setRoleFilter] = useState(null)
  const [tableOptions, setTableOptions] = useState({
    rowsPerPage: 5,
    page: 0,
    count: users?.length,
    handlePageChange: setCurrentPage,
    handleRowsPerPageChange: changeRowsPerPage
  })


  function toggleRole(roleId) {
    if (roleFilter == roleId) setRoleFilter(null)
    else setRoleFilter(roleId)
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
  function showResetPasswordDialog(entry) {
    setFocusedEntry(entry)
    setIsResetPasswordDialogOpen(true)
  }
  function showDeleteDialog(entry) {
    setFocusedEntry(entry)
    setIsDeleteDialogOpen(true)
  }
  function closeEditDialog(entry) {
    if (entry) {
      editMutation.mutate({ data: entry, func: editUserAsync })
    }
    setFocusedEntry(null)
    setIsEditDialogOpen(false)
  }
  function closeDeleteDialog(entry) {
    if (entry) {
      deleteMutation.mutate({ data: entry, func: deleteUserAsync })
    }
    setFocusedEntry(null)
    setIsDeleteDialogOpen(false)
  }
  function closeResetPasswordDialog(entry) {
    if (entry) {
      resetPasswordMutation.mutate(entry)
    }
    setFocusedEntry(null)
    setIsResetPasswordDialogOpen(false)
  }

  const createMutation = useMutation({
    mutationFn: runWithProgress,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
  })
  const editMutation = useMutation({
    mutationFn: runWithProgress,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
  })
  const deleteMutation = useMutation({
    mutationFn: runWithProgress,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
  })
  const resetPasswordMutation = useMutation({
    mutationFn: resetPassword,
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
  console.log(users)
  console.log(companies)
  // if(!user)return 
  return (
    <Paper sx={{ padding: '1em', paddingRight: 0, flexGrow: 1 }} elevation={2}>
      <PageHeader pageTitle={"Utilisateurs"} pagePath={["Menu"]}
        sortingOptions={[{ name: "id", label: 'Id' }, { name: "firstname", label: "Nom" }]}
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
        users={sortAndFilterData(users?.filter(u => roleFilter ? u.roles.some(r => r == roleFilter) : true), searchTerm, tableOptions.sortOption || "")}
        options={({ ...tableOptions, handlePageChange, handleRowsPerPageChange })}
        companies={companies}
        showEditDialog={showEditDialog}
        showDeleteDialog={showDeleteDialog}
        showResetPasswordDialog={showResetPasswordDialog}
      />
      <CreateDialog open={isCreateDialogOpen}
        companies={companies}
        handleClose={(user) => {
          if (user) {
            createMutation.mutate({ data: user, func: createUserAsync })
          }
          setIsCreateDialogOpen(false)
        }} />
      {focusedEntry && <EditDialog open={isEditDialogOpen} entry={focusedEntry} companies={companies} handleClose={closeEditDialog} />}
      {focusedEntry && <DeleteDialog open={isDeleteDialogOpen} entry={focusedEntry}
        companies={companies} handleClose={closeDeleteDialog} />}
      {focusedEntry && <ResetPasswordDialog open={isResetPasswordDialogOpen} companies={companies}
        entry={focusedEntry} handleClose={closeResetPasswordDialog} />}
      <Stack direction={{ md: 'row' }} gap={2} justifyContent='flex-end' padding={2}>
        <Stack direction='row' alignItems='center' gap={1}>
          <RoleChip roleId={SYSTEM_ROLES.ADMIN} handleClick={() => toggleRole(SYSTEM_ROLES.ADMIN)} />
          <Typography variant='body2'>Administrateur</Typography></Stack>
        <Stack direction='row' alignItems='center' gap={1}>
          <RoleChip roleId={SYSTEM_ROLES.MODERATOR} handleClick={() => toggleRole(SYSTEM_ROLES.MODERATOR)} />
          <Typography variant='body2'>Moderateur</Typography></Stack>
        <Stack direction='row' alignItems='center' gap={1}>
          <RoleChip roleId={SYSTEM_ROLES.AGENT} handleClick={() => toggleRole(SYSTEM_ROLES.AGENT)} />
          <Typography variant='body2'>Agent</Typography></Stack>
        <Stack direction='row' alignItems='center' gap={1}>
          <RoleChip roleId={SYSTEM_ROLES.CUSTOMER} handleClick={() => toggleRole(SYSTEM_ROLES.CUSTOMER)} />
          <Typography variant='body2'>Client</Typography></Stack>
      </Stack>
    </Paper >
  )
}
