import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import PropTypes from 'prop-types'

export const DetailsDialog = ({ open, handleClose, project }) => {

    console.log(project)
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Détails de l&apos;project</DialogTitle>
                <DialogContent>
                    <Typography variant="span" sx={{ fontWeight: 'bold' }}>{project.title}</Typography>
                    <Typography>{project.description}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fermer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
DetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
}