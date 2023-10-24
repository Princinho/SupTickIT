import { ArrowBack, ArrowForward, HighlightOff, Search } from '@mui/icons-material'
import { Box, Button, ButtonGroup, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { ApplicationsTable } from './ApplicationsTable'
import { useState } from 'react'
import { CreateDialog } from './CreateDialog'
import { sampleData } from '../../SampleData'

export const Applications = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [applications, setApplications] = useState([...sampleData.applications
  ])
  function createApplication(data) {
    setApplications(prev => {
      console.log(prev)
      console.log(data)
      let result = [{ ...data, id: applications.length + 1, dateCreated: new Date().toISOString(), createdBy: 3 }, ...prev]
      console.log(result)
      return result
    })
  }

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
              >
                <MenuItem value={10}>Nom</MenuItem>
                <MenuItem value={10}>Date</MenuItem>

              </Select>
            </FormControl>
          </Stack>

        </Grid>
        <Grid item xs={12} sm={7}>
          <Stack direction='row' width='100%' spacing={{ xs: 1, sm: 2 }} justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}>
            <TextField
              id="input-with-icon-textfield" size='small'
              sx={{ minWidth: '30%' }}
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
                value={10}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>

              </Select>
            </FormControl>

            <ButtonGroup variant="outlined" aria-label="outlined primary button group">
              <Button sx={{ backgroundColor: 'white', color: (theme) => theme.palette.text.secondary }}><ArrowBack /></Button>
              <Button sx={{ backgroundColor: 'white', color: (theme) => theme.palette.text.secondary }}><ArrowForward /></Button>
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
        <ApplicationsTable applications={applications} />
      </Box>
      <CreateDialog open={isCreateDialogOpen} handleClose={(data) => {
        console.log(data)
        if (data) {
          createApplication(data)
        }
        setIsCreateDialogOpen(false)
      }} />
    </Paper>
  )
}
