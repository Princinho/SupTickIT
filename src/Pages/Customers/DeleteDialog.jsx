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

export const DeleteDialog = ({ open, handleClose, entry }) => {
  return (
    <Box>
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogTitle>Supprimer la catégorie</DialogTitle>

        <DialogContent>
          <Typography variant="span" sx={{ fontWeight: "bold" }}>
            {entry?.firstname} &nbsp;
            {entry?.lastname}&nbsp;
          </Typography>
          <Divider />
          <Typography>{entry?.phone}&nbsp;</Typography>
          <Typography>{entry?.email}&nbsp;</Typography>
          <Divider />
          <Typography>{entry?.adress}&nbsp;</Typography>
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
