import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import PropTypes from 'prop-types'
import {  useState } from "react"
export const ChangePasswordDialog = ({ open, handleClose }) => {
    //TODO: Faire bosser la pagination
    const [formData, setFormData] = useState({ oldPassword: "", password: "", passwordConfirmation: '' })
    const [errors, setErrors] = useState({})
    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()} title="Changer de mot de passe">
                <DialogTitle>Changer de mot de passe</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Ancien mot de passe *"
                        name="oldPassword"
                        error={errors["oldPassword"]}
                        type="password"
                        value={formData.oldPassword}
                        onChange={(event) => setFormData(prev => ({ ...prev, oldPassword: event.target.value }))}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nouveau mot de passe *"
                        name="password"
                        error={errors["password"]}
                        type="password"
                        value={formData.password}
                        onChange={(event) => setFormData(prev => ({ ...prev, password: event.target.value }))}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Confirmation *"
                        name="passwordConfirmation"
                        error={errors["passwordConfirmation"]}
                        type="password"
                        value={formData.passwordConfirmation}
                        onChange={(event) => setFormData(prev => ({ ...prev, passwordConfirmation: event.target.value }))}
                        fullWidth
                        variant="standard"
                    />


                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setErrors({})
                        handleClose()
                    }}>Annuler</Button>
                    <Button onClick={() => {
                        for (let field in formData) {
                            if (!formData[field]) {
                                setErrors({ ...errors, field: true })
                            }
                            else {
                                delete errors[field]
                            }
                        }
                        if(Object.keys(errors).some(key=>errors[key])){
                            // if an error is true
                            handleClose()
                            return
                        }
                        handleClose(formData)                        
                    }}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
ChangePasswordDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    companies: PropTypes.array
}