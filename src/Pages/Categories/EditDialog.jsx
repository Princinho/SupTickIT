import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
export const EditDialog = ({ open, handleClose, category, projects }) => {
    const [formData, setFormData] = useState({ ...category })
    const [titleError, setTitleError] = useState(false)
    function handleProjectChange(event) {
        setFormData(prev => ({ ...prev, projectId: event.target.value }))
    }
    useEffect(() => setFormData({ ...category }), [category])
    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Modifier la catégorie</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ marginTop: '1em' }}>
                        <InputLabel id="project-select-label">Projet</InputLabel>
                        <Select
                            labelId="project-select-label"
                            id="project-select"
                            value={`${formData.projectId}`}
                            label="Age"
                            onChange={handleProjectChange}
                        >
                            {projects.map(
                                project => <MenuItem key={`projet-${project.id}`} value={project.id}>{project.title}</MenuItem>
                            )}

                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nom *"
                        error={titleError}
                        type="text"
                        value={formData.title}
                        onChange={(event) => setFormData(prev => ({ ...prev, title: event.target.value }))}
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
                        // console.log(formData)
                        // return
                        if (!formData.title) {
                            setTitleError(true)
                            return
                        } else {
                            setTitleError(false)
                            handleClose(formData)
                        }
                    }}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
EditDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    category: PropTypes.object,
    projects: PropTypes.array
}