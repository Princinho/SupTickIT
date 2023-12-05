import { Box, Button, Dialog, DialogActions, DialogTitle } from '@mui/material'
import { FiltersContainer } from './FiltersContainer'
import PropTypes from "prop-types"
export const FiltersDialog = ({ customers, agents, open, handleClose, filters, initialFilters, setFilters }) => {
    function resetFilters() {

    }
    return (
        <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth keepMounted={true} >
            <DialogTitle>Definir les parametres de filtrage</DialogTitle>
            <Box padding={1} paddingInline={2} >

                <FiltersContainer
                    resetFilters={resetFilters}
                    filters={filters}
                    initialFilters={initialFilters}
                    setFilters={setFilters}
                    agents={agents}
                    customers={customers}
                />
            </Box>
            <DialogActions>
                <Button onClick={() => {
                    handleClose()
                }}>Annuler</Button>
                <Button color="success" onClick={() => {
                    handleClose(filters)
                }}>Appliquer</Button>

            </DialogActions>
        </Dialog>)
}
FiltersDialog.propTypes = {
    customers: PropTypes.array,
    agents: PropTypes.array,
    applyFilters: PropTypes.func,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    filters: PropTypes.object,
    initialFilters: PropTypes.object,
    setFilters: PropTypes.func
}