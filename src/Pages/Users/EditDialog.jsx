import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material"
import PropTypes from 'prop-types'
import { useState } from "react"

export const EditDialog = ({ open, handleClose, companies, entry }) => {
    //TODO: Faire bosser la pagination

    const [formData, setFormData] = useState({
        id: entry.id, firstname: entry.firstname,
        lastname: entry.lastname, companyId: entry.companyId, username: entry.username
    })
    const [nameError, setNameError] = useState(false)
    console.log(formData)
    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Modification de l&apos;utilisateur</DialogTitle>
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
                    <FormControlLabel control={<Switch checked={formData.isCompanyAccount || formData.companyId} onChange={() => setFormData(prev => ({ ...prev, isCompanyAccount: !prev.isCompanyAccount }))} />} label="Compte Partenaire" />
                    {formData.isCompanyAccount || formData.companyId &&
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
                            {/* {formData.companyId &&
                                <FormControlLabel control={<Switch checked={formData.canManagePartnerUsers} onChange={() => setFormData(prev => ({ ...prev, canManagePartnerUsers: !prev.canManagePartnerUsers }))} />} label="Autoriser a gerer les utilisateurs du partenaire" />} */}
                        </>
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setNameError(false)
                        handleClose()
                    }}>Annuler</Button>
                    <Button onClick={() => {
                        if (!(formData.firstname && formData.lastname && formData.username)) {
                            setNameError(true)
                        } else {
                            setNameError(false)
                            handleClose(formData)
                            setFormData({ firstname: '', lastname: '', username: '', companyId: '' })
                        }
                    }}>Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
EditDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    companies: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
    entry: PropTypes.shape({
        id: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        companyId: PropTypes.string,
        username: PropTypes.string
    })
}