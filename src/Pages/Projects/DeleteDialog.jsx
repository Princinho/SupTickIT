import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import PropTypes from 'prop-types'

export const DeleteDialog = ({ open, handleClose, project }) => {

    console.log(project)
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Supprimer le project</DialogTitle>
                <DialogContent>
                    <Typography variant="span" sx={{fontWeight:'bold'}}>{project.title}</Typography>
                    <Typography>{project.description}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button color="error" variant="outlined" onClick={() => handleClose(project)}>Supprimer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
}