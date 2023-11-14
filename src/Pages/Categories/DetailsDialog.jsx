import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import PropTypes from 'prop-types'

export const DetailsDialog = ({ open, handleClose, category, project }) => {

    console.log(category)
    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Détails de la categorie</DialogTitle>
                <DialogContent>
                    <Typography variant="span" sx={{ fontWeight: 'bold' }}>{category.name}</Typography>
                    <Typography>{category.description}</Typography>
                    <Stack direction='row' spacing={1}>

                        <Typography variant="span" sx={{ fontWeight: 'bold' }}>Projet</Typography>
                        <Typography>{project.title}</Typography>
                    </Stack>
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
    category: PropTypes.object.isRequired,
    project: PropTypes.object.isRequired
}