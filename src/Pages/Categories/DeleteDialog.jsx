import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from "@mui/material"
import PropTypes from 'prop-types'

export const DeleteDialog = ({ open, handleClose, category, projects }) => {

    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Supprimer la catégorie</DialogTitle>

                <DialogContent>
                    <Typography variant="span" sx={{ fontWeight: 'bold' }}>{category.name}</Typography>
                    <Divider />
                    <Typography variant="span" sx={{ fontWeight: 'bold' }}>{projects.find(p => p.id == category.projectId)?.title}</Typography>
                    <Typography>{category.description}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>handleClose(false)}>Annuler</Button>
                    <Button color="error" variant="outlined" onClick={() => handleClose(true)}>Supprimer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired,
    projects: PropTypes.array
}