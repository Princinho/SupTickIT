import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from "@mui/material"
import PropTypes from 'prop-types'
import { useContext } from "react"
import { getCompanyProjects } from "../../Api"
import { UserContext } from "../../Contexts"
export const DetailsDialog = ({ open, handleClose, entry }) => {
    const { user } = useContext(UserContext)
    console.log(user)
    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Details du ticket #{entry.id}</DialogTitle>
                <DialogContent>
                    <Grid container direction='row' spacing={2} justifyContent='flex-start'>

                        <Grid item xs={12}>
                            <Typography variant="h6" fontWeight='bold'>{entry.name}</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="span">Projet</Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="span">{getCompanyProjects(user?.companyId).find(p => p.id == entry.projectId)?.title}</Typography>
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
                    }}>Fermer</Button>

                </DialogActions>
            </Dialog>
        </Box >
    )
}
DetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired
}