import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import PropTypes from 'prop-types'

export const DeleteDialog = ({ open, handleClose, entry }) => {

    console.log(entry)
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Supprimer l&apos;entreprise</DialogTitle>
                <DialogContent>
                    <Typography variant="span" sx={{ fontWeight: 'bold' }}>{entry.name}</Typography>
                    <Typography>{entry.description}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button color="error" variant="outlined" onClick={() => handleClose(entry)}>Supprimer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired
}