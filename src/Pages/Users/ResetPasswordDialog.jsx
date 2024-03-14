import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import PropTypes from 'prop-types'
export const ResetPasswordDialog = ({ open, handleClose, companies, entry }) => {
    //TODO: Faire bosser la pagination

    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Réinitialiser le mot de passe de l&apos;utilisateur</DialogTitle>
                <DialogContent>
                    <Stack>
                        <Typography variant="body1">{entry.firstname} {entry.lastname}</Typography>
                        <Typography variant="body1">{entry.username}</Typography>
                        <Typography variant="body1">{companies?.find(c => c.id == entry.companyId)?.name}</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose()
                    }}>Annuler</Button>
                    <Button color="error" onClick={() => {

                        handleClose(entry)

                    }}>Réinitialiser</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
ResetPasswordDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    companies: PropTypes.array.isRequired,
    handleClose: PropTypes.func.isRequired,
    entry: PropTypes.shape({
        id: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        companyId: PropTypes.string,
        username: PropTypes.string,
    })
}