import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

export const DeleteDialog = ({ open, handleClose, customer, entry }) => {
  return (
    <Box>
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogTitle>Supprimer la catégorie</DialogTitle>

        <DialogContent>
          <Typography variant="span" sx={{ fontWeight: "bold" }}>
            {entry?.make} &nbsp;
            {entry?.model}&nbsp;
            {entry?.year}
          </Typography>
          <Divider />
          <Typography>Couleur</Typography>
          <Typography fontWeight="bold">{entry?.color}</Typography>
          <Divider />
          <Typography>Propriétaire</Typography>
          <Typography fontWeight="bold">
            {customer?.firstname || "Inconnu"}&nbsp;{" "}
            {customer?.lastname || "Inconnu"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)}>Annuler</Button>
          <Button
            color="error"
            variant="outlined"
            onClick={() => handleClose(true)}
          >
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  entry: PropTypes.object.isRequired,
  customer: PropTypes.object,
};
