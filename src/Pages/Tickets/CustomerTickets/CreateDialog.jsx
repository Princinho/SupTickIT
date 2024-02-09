import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import PropTypes from 'prop-types'
import { useContext, useState } from "react"
import { DropdownSelector } from "../../../Components/DropdownSelector"
import {  getProjectCategoriesAsync, getSystemSettings } from "../../../Api"
import { UserContext } from "../../../Contexts"
import { TICKET_STATUS } from "../../../utils"
import { useQuery } from "@tanstack/react-query"
export const CreateDialog = ({ open, projects, handleClose }) => {
    const { user } = useContext(UserContext)
    const initData = { name: "", description: "", status: TICKET_STATUS.PENDING, createdBy: user?.id }
    const [formData, setFormData] = useState(initData)
    const { data: settings } = useQuery({ queryKey: ['settings'], queryFn: getSystemSettings })
    const { data: categories } = useQuery({ queryKey: ['categories', formData?.projectId], queryFn: () => getProjectCategoriesAsync(formData?.projectId) })
    const [nameError, setNameError] = useState(false)
    function reset() {
        setFormData(initData)
    }
    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Nouveau ticket</DialogTitle>
                <DialogContent>
                    <DropdownSelector label="Projet *" labelField="title"
                        options={projects || []}
                        handleChange={value => setFormData(prev => ({ ...prev, projectId: value, categoryId: "" }))}
                    />
                    <DropdownSelector label="Catégorie" labelField="title"
                        disabled={!formData.projectId}
                        options={categories || []}
                        handleChange={value => setFormData(prev => ({ ...prev, categoryId: value }))}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label={settings?.productRefLabel || "Référence produit"}
                        error={nameError}
                        type="text"
                        value={formData.productRef}
                        onChange={(event) => setFormData(prev => ({ ...prev, productReference: event.target.value }))}
                        fullWidth
                        variant="standard"
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
                                reset()
                            }
                        }}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </Box >
    )
}
CreateDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}