import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";

export const DetailsDialog = ({ open, handleClose, category }) => {
  return (
    <Box>
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogTitle>Détails de la catégorie</DialogTitle>
        <DialogContent>
          <Typography variant="span" sx={{ fontWeight: "bold" }}>
            {category.name}
          </Typography>
          <Typography>{category.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
DetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  customer: PropTypes.object.isRequired,
};
