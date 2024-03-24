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

export const DeleteDialog = ({ open, handleClose, categories, entry }) => {
  return (
    <Box>
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogTitle>Supprimer la pièce</DialogTitle>

        <DialogContent>
          <Typography variant="span">Pièce:</Typography>{" "}
          <Typography fontWeight="bold">{entry.name}</Typography>
          <Typography variant="span">{entry?.description}</Typography>
          <Divider />
          <Typography>
            Prix ({entry?.isLineEditAllowed ? "Modifiable" : ""})
          </Typography>
          <Typography fontWeight="bold">{entry?.price}</Typography>
          <Divider />
          <Typography>Catégorie</Typography>
          <Typography fontWeight="bold">
            {categories?.find((c) => c.id == entry.serviceCategoryId)?.name}
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
  categories: PropTypes.array.isRequired,
};
