import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import PropTypes from 'prop-types'

export const RemoveProject = ({ open, handleClose, project }) => {

    // console.log(project)
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Retirer le projet</DialogTitle>
                <DialogContent>
                    <Typography variant="span" sx={{fontWeight:'bold'}}>{project.title}</Typography>
                    <Typography>{project.description}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button color="error" variant="outlined" onClick={() => handleClose(project)}>Retirer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
RemoveProject.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    project: PropTypes.object.isRequired
}