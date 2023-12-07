import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import PropTypes from 'prop-types'
import { useContext, useState } from "react"
import { UserContext } from "../../Contexts"
export const CreateDialog = ({ open, handleClose }) => {
    const { user } = useContext(UserContext)
    //TODO: Faire bosser la pagination
    const [formData, setFormData] = useState({ firstName: "", lastName: "", companyId: user?.companyId, username: '' })
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

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setNameError(false)
                        handleClose()
                    }}>Annuler</Button>
                    <Button onClick={() => {
                        if (!(formData.firstName && formData.lastName && formData.username) || (formData.isCompanyAccount && !formData.companyId)) {
                            setNameError(true)
                            return
                        } else {
                            setNameError(false)
                            let createObject = { ...formData }
                            delete createObject.isCompanyAccount
                            if (!formData.isCompanyAccount) delete createObject.companyId
                            handleClose({ ...createObject, password: 'Admin#12345', companyId: user?.companyId })
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