import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from "@mui/material"
import PropTypes from 'prop-types'
import { useContext } from "react"
import { DataContext } from "../../Contexts"
export const DeleteDialog = ({ open, handleClose, entry }) => {
    //TODO: Faire bosser la pagination
    const { sampleData } = useContext(DataContext)

    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>Suppression de l&apos;utilisateur</DialogTitle>
                <DialogContent>
                    <Stack>
                        <Typography variant="body1">{entry.firstname} {entry.lastname}</Typography>
                        <Typography variant="body1">{entry.username}</Typography>
                        <Typography variant="body1">{sampleData.companies.find(c => c.id == entry.companyId)?.name}</Typography>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose()
                    }}>Annuler</Button>
                    <Button color="error" onClick={() => {

                        handleClose(entry)

                    }}>Supprimer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    entry: PropTypes.shape({
        id: PropTypes.string,
        firstname: PropTypes.string,
        lastname: PropTypes.string,
        companyId: PropTypes.string,
        username: PropTypes.string
    })
}