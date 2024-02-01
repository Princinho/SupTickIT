import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import PropTypes from 'prop-types'
import { useState } from "react"

export const AddCompanyToProjectDialog = ({ open, handleClose, entry, projects }) => {
  const [projectId, setProjectId] = useState(null)
  function handleChange(event) {
    setProjectId(event.target.value)
  }
  console.log(projects)
  if (!entry) { return <></> }
  return (
    <Box>
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogTitle>Ajouter un projet a {entry.name}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginTop: '1em' }}>
            <InputLabel id="project-select-label">Projet</InputLabel>
            <Select
              labelId="project-select-label"
              id="project-select"
              value={projectId}
              label="Age"
              onChange={handleChange}
            >
              {projects?.filter(p => !entry.projects?.includes(p.id)).map(
                project => <MenuItem key={`projet-${project.id}`} value={project.id}>{project.title}</MenuItem>
              )}

            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
          <Button onClick={() => { handleClose( projectId) }}>Ajouter</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
AddCompanyToProjectDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
  projects: PropTypes.array
}