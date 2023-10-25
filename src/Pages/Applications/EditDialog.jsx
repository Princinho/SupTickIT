import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import PropTypes from 'prop-types'
import { useEffect, useState } from "react"
export const EditDialog = ({ open, handleClose, application }) => {
    const [formData, setFormData] = useState({ ...application })
    useEffect(() => {
        setFormData(application)
    }, [application]);
    // newFormData();
    
    console.log(application)
    console.log(formData)
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Modifier l&apos;application</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="title"
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
    application: PropTypes.object.isRequired
}