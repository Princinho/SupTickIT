import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import PropTypes from 'prop-types'
import { useState } from "react"
export const CreateDialog = ({ open, handleClose, companies }) => {
    //TODO: Faire bosser la pagination
    const [formData, setFormData] = useState({ firstName: "", lastName: "", companyId: '', username: '' })
    const [nameError, setNameError] = useState(false)
    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Nouvel utilisateur</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nom *"
                        error={nameError}
                        type="text"
                        value={formData.lastName}
                        onChange={(event) => setFormData(prev => ({ ...prev, lastName: event.target.value }))}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Prenoms *"
                        error={nameError}
                        type="text"
                        value={formData.firstName}
                        onChange={(event) => setFormData(prev => ({ ...prev, firstName: event.target.value }))}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="email *"
                        error={nameError}
                        type="text"
                        value={formData.username}
                        onChange={(event) => setFormData(prev => ({ ...prev, username: event.target.value }))}
                        fullWidth
                        variant="standard"
                    />
                    <FormControl fullWidth sx={{ marginTop: '1em' }}>
                        <InputLabel id="company-select-label">Entreprise</InputLabel>
                        <Select
                            labelId="company-select-label"
                            id="company-select"
                            value={formData.companyId}
                            label="Entreprise"
                            onChange={event => setFormData(prev => ({ ...prev, companyId: event.target.value }))}
                        >
                            {companies?.map(
                                company => <MenuItem key={`projet-${company.id}`} value={company.id}>{company.name}</MenuItem>
                            )}

                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setNameError(false)
                        handleClose()
                    }}>Annuler</Button>
                    <Button onClick={() => {
                        if (!(formData.firstName && formData.lastName && formData.username && formData.companyId)) {
                            setNameError(true)
                            return
                        } else {
                            setNameError(false)
                            handleClose({...formData,password:'Admin#12345'})
                            setFormData({ firstName: '', lastName: '', username: '', companyId: '' })
                        }
                    }}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
CreateDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    companies: PropTypes.array
}