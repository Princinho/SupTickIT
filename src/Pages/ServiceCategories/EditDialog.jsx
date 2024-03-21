import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
export const EditDialog = ({ open, handleClose, category }) => {
  const [formData, setFormData] = useState({ ...category });
  const [nameError, setNameError] = useState(false);
  useEffect(() => setFormData({ ...category }), [category]);
  return (
    <Box>
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogTitle>Modifier la catégorie</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom *"
            error={nameError}
            type="text"
            value={formData.name}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, name: event.target.value }))
            }
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Description"
            type="text"
            value={formData.description}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                description: event.target.value,
              }))
            }
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setNameError(false);
              handleClose();
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={() => {
              // console.log(formData)
              // return
              if (!formData.name) {
                setNameError(true);
                return;
              } else {
                setNameError(false);
                handleClose(formData);
              }
            }}
          >
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
EditDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  category: PropTypes.object,
  projects: PropTypes.array,
};
