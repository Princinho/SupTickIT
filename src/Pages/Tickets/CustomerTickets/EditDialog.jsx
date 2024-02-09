import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from "react"
import { DropdownSelector } from "../../../Components/DropdownSelector"
export const EditDialog = ({ open, handleClose, categories, projects, entry }) => {
    // const { user } = useContext(UserContext)
    // console.log(user)
    //TODO: Faire bosser la pagination

    const [nameError, setNameError] = useState(false)

    const [formData, setFormData] = useState({ ...entry })
    const resetForm = useCallback(() => {
        setFormData({ ...entry })
    },[entry])
    useEffect(() => {
        resetForm()
    }, [entry, resetForm])
    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Nouveau ticket</DialogTitle>
                <DialogContent>
                    <DropdownSelector label="Projet *" labelField="title"
                        options={projects}
                        defaultValue={`${categories?.find(cat => cat.id == entry.categoryId)?.projectId}`}
                        handleChange={value => setFormData(prev => ({ ...prev, projectId: value }))}
                    />
                    <DropdownSelector label="Catégorie" labelField="title"
                        disabled={!formData.categoryId}
                        options={categories}
                        defaultValue={`${formData?.categoryId}`}
                        handleChange={value => setFormData(prev => ({ ...prev, categoryId: value }))}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Titre *"
                        error={nameError}
                        type="text"
                        value={formData.name}
                        onChange={(event) => setFormData(prev => ({ ...prev, name: event.target.value }))}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Numero de carte"
                        error={nameError}
                        type="text"
                        value={formData.productRef}
                        onChange={(event) => setFormData(prev => ({ ...prev, productRef: event.target.value }))}
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
                        setNameError(false)
                        handleClose()
                    }}>Annuler</Button>
                    <Button
                        disabled={!formData?.projectId || !formData.name || !formData.description}
                        onClick={() => {
                            if (!formData.name) {
                                setNameError(true)

                            } else {
                                setNameError(false)
                                handleClose(formData)
                                resetForm()
                            }
                        }}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </Box >
    )
}
EditDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired,
    categories:PropTypes.array.isRequired,
    projects:PropTypes.array.isRequired,
}