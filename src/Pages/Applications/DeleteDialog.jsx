import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import PropTypes from 'prop-types'

export const DeleteDialog = ({ open, handleClose, application }) => {

    console.log(application)
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Supprimer l&apos;application</DialogTitle>
                <DialogContent>
                    <Typography variant="span" sx={{fontWeight:'bold'}}>{application.title}</Typography>
                    <Typography>{application.description}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button color="error" variant="outlined" onClick={() => handleClose(application)}>Supprimer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    application: PropTypes.object.isRequired
}