import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material"
import PropTypes from 'prop-types'
import { useContext, useState } from "react"
import { NEW_ACCOUNT_DEFAULT_PASSWORD, SYSTEM_ROLES, isInRole } from "../../utils"
import { UserContext } from "../../Contexts"
export const CreateDialog = ({ open, handleClose, companies }) => {
    //TODO: Faire bosser la pagination
    const [formData, setFormData] = useState({ firstname: "", lastname: "", isCompanyAccount: false, companyId: '', username: '' })
    const [nameError, setNameError] = useState(false)
    const { user } = useContext(UserContext)
    console.log(user)
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
                        value={formData.lastname}
                        onChange={(event) => setFormData(prev => ({ ...prev, lastname: event.target.value }))}
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Prenoms *"
                        error={nameError}
                        type="text"
                        value={formData.firstname}
                        onChange={(event) => setFormData(prev => ({ ...prev, firstname: event.target.value }))}
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
                    {isInRole(user,SYSTEM_ROLES.ADMIN) && <FormControlLabel control={
                        <Switch checked={formData.isCompanyAccount}
                            onChange={() => setFormData(prev => ({ ...prev, isCompanyAccount: !prev.isCompanyAccount }))} />}
                        label="Compte Partenaire" />}

                    {formData.isCompanyAccount &&
                        <>
                            <FormControl fullWidth sx={{ marginTop: '1em' }}>
                                <InputLabel id="company-select-label">Entreprise partenaire </InputLabel>
                                <Select
                                    labelId="company-select-label"
                                    id="company-select"
                                    value={formData.companyId}
                                    label="Entreprise partenaire"
                                    onChange={event => setFormData(prev => ({ ...prev, companyId: event.target.value }))}
                                >
                                    {companies?.map(
                                        company => <MenuItem key={`projet-${company.id}`} value={company.id}>{company.name}</MenuItem>
                                    )}

                                </Select>
                            </FormControl>
                        </>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setNameError(false)
                        handleClose()
                    }}>Annuler</Button>
                    <Button onClick={() => {
                        if (!(formData.firstname && formData.lastname && formData.username) || (formData.isCompanyAccount && !formData.companyId)) {
                            setNameError(true)
                            return
                        } else {
                            setNameError(false)
                            let createObject = { ...formData }
                            delete createObject.isCompanyAccount
                            if (!formData.isCompanyAccount) delete createObject.companyId
                            handleClose({ ...createObject, password: NEW_ACCOUNT_DEFAULT_PASSWORD, passwordConfirmation: NEW_ACCOUNT_DEFAULT_PASSWORD })
                            setFormData({ firstname: '', lastname: '', username: '', companyId: '' })
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