import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, } from "@mui/material"
import PropTypes from 'prop-types'
export const SimpleDialog = ({ open, handleClose, dialogTitle, dialogContent, confirmationButtonColor = 'primary', cancelText = "Annuler", approveText = "Confirmer" }) => {
    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>{dialogTitle}</DialogTitle>
                <DialogContent>
                    {dialogContent}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose()
                    }}>{cancelText}</Button>
                    <Button color={confirmationButtonColor} onClick={() => {
                        handleClose(true)

                    }}>{approveText}</Button>
                </DialogActions>
            </Dialog>
        </Box>
    )
}
SimpleDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    dialogTitle: PropTypes.string.isRequired,
    dialogContent: PropTypes.array.isRequired,
    confirmationButtonColor: PropTypes.string,
    cancelText: PropTypes.string,
    approveText: PropTypes.string,
}