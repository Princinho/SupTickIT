import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material"
import PropTypes from 'prop-types'
export const DeleteDialog = ({ open, handleClose, categories, projects, entry }) => {
    
    let projId = categories?.find(cat => cat.id == entry.categoryId)?.projectId
    
    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Supprimer le ticket</DialogTitle>
                <DialogContent>
                    <Grid container direction='row' spacing={2} justifyContent='flex-start'>

                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight='bold'>{entry.name}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="span">Catégorie</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="span">{categories?.find(p => p.id == entry?.categoryId)?.title}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="span">Projet</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="span">{projects?.find(p => p.id == projId)?.title}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="span">Description</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            {entry.description}
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose()
                    }}>Annuler</Button>
                    <Button

                        color="error"
                        onClick={
                            () => handleClose(entry)
                        }>Supprimer</Button>
                </DialogActions>
            </Dialog>
        </Box >
    )
}
DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired,
    categories:PropTypes.array.isRequired,
    projects:PropTypes.array.isRequired,
}