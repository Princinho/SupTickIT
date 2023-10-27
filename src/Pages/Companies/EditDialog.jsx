import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
export const EditDialog = ({ open, handleClose,  entry }) => {
    const [formData, setFormData] = useState({ ...entry })
    useEffect(() => {
        setFormData(entry)
    }, [entry]);
    // newFormData();
    
    console.log(entry)
    console.log(formData)
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Modifier l&apos;application</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nom"
                        type="text"
                        value={formData.name}
                        onChange={(event) => setFormData(prev => ({ ...prev, name: event.target.value }))}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="description"
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
EditDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired
}