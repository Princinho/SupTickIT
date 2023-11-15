import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import PropTypes from "prop-types"
import { useState } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs"
import { addOnemonth } from "../../utils"
export const AddRoleDialog = ({ open, roles, handleClose, currentlyAssignedRoles, }) => {
    const [roleId, setRoleId] = useState('')
    const [startDate, setStartDate] = useState(new Date().toISOString())
    const [expiryDate, setExpiryDate] = useState(addOnemonth(new Date()).toISOString())
    console.log(currentlyAssignedRoles)
    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Ajouter un Role</DialogTitle>
                <DialogContent>

                    <FormControl fullWidth sx={{ marginTop: '1em' }}>
                        <InputLabel id="role-select-label">Role</InputLabel>
                        <Select
                            labelId="role-select-label"
                            id="role-select"
                            value={roleId}
                            label="Role"
                            onChange={event => setRoleId(event.target.value)}
                        >
                            {roles.filter(newRole => !(currentlyAssignedRoles.some(r => r.roleId == newRole.id))).map(
                                role => <MenuItem key={`role-${role.id}`} value={role.id}>{role.nom}</MenuItem>
                            )}

                        </Select>
                    </FormControl>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb" >
                        <DatePicker disablePast label="Date de debut" sx={{ width: '100%', marginTop: '1em' }}
                            value={dayjs(startDate)}
                            onChange={(value) => setStartDate(value)}
                        />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb" >
                        <DatePicker disablePast label="Date d'expiration" sx={{ width: '100%', marginTop: '1em' }}
                            value={dayjs(expiryDate)}
                            onChange={(value) => setExpiryDate(value)}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()} >Annuler</Button>
                    <Button onClick={() => handleClose(roleId, startDate, expiryDate)} >Enregistrer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
AddRoleDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    currentlyAssignedRoles: PropTypes.array,
    roles: PropTypes.Array
}