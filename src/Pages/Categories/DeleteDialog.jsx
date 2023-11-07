import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider,  Typography } from "@mui/material"
import PropTypes from 'prop-types'
import { useContext } from "react"
import { DataContext } from "../../Contexts"

export const DeleteDialog = ({ open, handleClose, category }) => {
    const { sampleData } = useContext(DataContext)
    const { projects } = sampleData

    console.log(category)
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
                    <Button onClick={handleClose}>Annuler</Button>
                    <Button color="error" variant="outlined" onClick={() => handleClose(category)}>Supprimer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    category: PropTypes.object.isRequired
}