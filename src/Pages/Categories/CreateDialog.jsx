import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import PropTypes from 'prop-types'
import { useState } from "react"
export const CreateDialog = ({ open, handleClose, projects }) => {
    //TODO: Faire bosser la pagination
    const [formData, setFormData] = useState({ name: '', description: '', projectId: '' })

    function reset() {
        setFormData({ name: '', description: '', projectId: '' })
    }

    const [titleError, setTitleError] = useState(false)
    function handleProjectChange(event) {
        setFormData(prev => ({ ...prev, projectId: event.target.value }))
    }
    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Nouvelle catégorie</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ marginTop: '1em' }}>
                        <InputLabel id="project-select-label">Projet</InputLabel>
                        <Select
                            labelId="project-select-label"
                            id="project-select"
                            value={formData.projectId}
                            label="Age"
                            onChange={handleProjectChange}
                        >
                            {projects?.map(
                                project => <MenuItem key={`projet-${project.id}`} value={project.id}>{project.title}</MenuItem>
                            )}

                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nom de la catégorie *"
                        error={titleError}
                        type="text"
                        value={formData.name}
                        onChange={(event) => setFormData(prev => ({ ...prev, name: event.target.value }))}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Description"
                        type="text"
                        value={formData.description}
                        onChange={(event) => setFormData(prev => ({ ...prev, description: event.target.value }))}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setTitleError(false)
                        handleClose()
                    }}>Annuler</Button>
                    <Button onClick={() => {
                        if (!formData.name) {
                            setTitleError(true)
                            return
                        } else {
                            setTitleError(false)
                            handleClose(formData)
                        }
                        reset()
                    }}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
CreateDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    projects: PropTypes.array
}