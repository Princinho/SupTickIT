import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material"
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

export const DetailsDialog = ({ open, handleClose, entry }) => {
    const navigate = useNavigate();
    function redirectToCompanyDetailsPage() {
        navigate(`${entry.id}`)
    }
    return (
        <Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Aperçu de l&apos;entreprise</DialogTitle>
                <DialogContent>
                    <Typography variant="span" sx={{ fontWeight: 'bold' }}>{entry.name}</Typography>
                    <Typography>{entry.description}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={redirectToCompanyDetailsPage}>Détails</Button>
                    <Button onClick={handleClose}>Fermer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
DetailsDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired
}