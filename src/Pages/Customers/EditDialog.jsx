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
export const EditDialog = ({ open, handleClose, entry }) => {
  const [formData, setFormData] = useState({ ...entry });
  const [touchedFields, setTouchedFields] = useState([]);
  useEffect(() => setFormData({ ...entry }), [entry]);
  return (
    <Box>
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogTitle>Modifier le Véhicule</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom*"
            error={touchedFields.includes("lastname") && !formData.lastname}
            type="text"
            value={formData.lastname}
            onChange={(event) => {
              setTouchedFields((prev) => [...prev, "lastname"]);
              setFormData((prev) => ({
                ...prev,
                lastname: event.target.value,
              }));
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Prenoms"
            type="text"
            value={formData.firstname}
            onChange={(event) => {
              setFormData((prev) => ({
                ...prev,
                firstname: event.target.value,
              }));
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Telephone*"
            error={touchedFields.includes("phone") && !formData.phone}
            type="tel"
            value={formData.phone}
            onChange={(event) => {
              setTouchedFields((prev) => [...prev, "phone"]);
              setFormData((prev) => ({ ...prev, phone: event.target.value }));
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email"
            type="email"
            value={formData.email}
            onChange={(event) => {
              setFormData((prev) => ({
                ...prev,
                email: event.target.value,
              }));
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Adresse"
            type="adress"
            value={formData.adress}
            onChange={(event) => {
              setFormData((prev) => ({
                ...prev,
                adress: event.target.value,
              }));
            }}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={() => {
              if (touchedFields.some((f) => !formData[f])) {
                return;
              } else {
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
  entry: PropTypes.object,
  customers: PropTypes.array,
};
