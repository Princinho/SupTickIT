import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import PropTypes from 'prop-types'
import { useState } from "react"
export const CreateDialog = ({ open, handleClose }) => {
    // TODO: Faire bosser la pagination
    const [formData, setFormData] = useState({})
    console.log(formData)
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Nouvelle application</DialogTitle>
                <DialogContent>
                    {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
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
CreateDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired
}