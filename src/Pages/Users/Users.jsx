import { ArrowBack, ArrowForward, HighlightOff, Search } from '@mui/icons-material'
import { Box, Button, ButtonGroup, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../Contexts'
import { PageHeader } from '../../Components/PageHeader'
import { UsersTable } from './UsersTable'

export const Users = () => {
  // TODO: Add entry creation date and entry subscription date.

  const { sampleData, setSampleData } = useContext(DataContext)

  const [sortOption, setSortOption] = useState({ option: 'name' })
  const [users, setUsers] = useState([])

  useEffect(() => {
    setUsers(sampleData?.users || [])
  }, [sampleData])

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

  return (
    <Paper sx={{ padding: '1em', paddingRight: 0, flexGrow: 1 }} elevation={2}>
      <PageHeader pageTitle={"Utilisateurs"} pagePath={["Menu"]}
        sortingOptions={[{ name: "id", label: 'Id' }, { name: "name", label: "Nom" }]}
        onSortingOptionChanged={(value) => console.log('sorting options changed', value)}
        onSearchTermChanged={(value) => console.log('search term changed', value)}
        onPaginationChanged={(value) => console.log('search term changed', value)}
        onPageChanged={(value) => console.log('search term changed', value)}
        currentPageIndex={tableOptions.page}
        itemsCount={tableOptions.count}
        rowsPerPage={tableOptions.rowsPerPage}
      />

      <UsersTable
        users={sampleData.users}
        options={tableOptions}
      />

    </Paper >
  )
}
