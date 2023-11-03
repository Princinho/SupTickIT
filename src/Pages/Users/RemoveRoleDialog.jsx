import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import PropTypes from "prop-types"
import { useContext } from "react"
import { DataContext } from "../../Contexts"

export const RemoveRoleDialog = ({ open, handleClose, roleAssignMent }) => {
    const { sampleData } = useContext(DataContext)
    console.log(roleAssignMent)
    console.log(sampleData.users.find(u => u.id == roleAssignMent.userId))
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirmer le retrait du role </DialogTitle>
                <DialogContent>
                    <Stack direction='row' spacing={1}>
                        <Typography variant="body1">Utilisateur: </Typography>
                        <Typography variant="body1" fontWeight='bold'>{sampleData.users.find(u => u.id == roleAssignMent.userId)?.firstName}</Typography>
                    </Stack>
                    <Stack direction='row' spacing={1}>
                        <Typography variant="body1">Role:</Typography>
                        <Typography variant="body1" fontWeight='bold'>{sampleData.roles.find(r => r.id == roleAssignMent.roleId)?.nom}</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()} >Annuler</Button>
                    <Button onClick={() => handleClose(roleAssignMent)} >Retirer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
RemoveRoleDialog.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    roleAssignMent: PropTypes.object
}