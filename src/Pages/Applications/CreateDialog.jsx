import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import PropTypes from 'prop-types'
import { useState } from "react"
export const CreateDialog = ({ open, handleClose }) => {
    //TODO: Faire bosser la pagination
    //TODO: Afficher des icones aulieu de boutons sur mobile
    //TODO: Faire bosser la modification
    //TODO: Faire bosser la suppression
    const [formData, setFormData] = useState({})
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Nouvelle application</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nom"
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
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button onClick={() => handleClose(formData)}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
CreateDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}