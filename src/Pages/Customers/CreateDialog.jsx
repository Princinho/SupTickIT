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
import { useState } from "react";
export const CreateDialog = ({ open, handleClose }) => {
  const init = {
    lastname: "",
    firstname: "",
    email: "",
    phone: "",
  };
  const [formData, setFormData] = useState({
    ...init,
  });
  const [touchedFields, setTouchedFields] = useState([]);
  function reset() {
    setFormData({
      ...init,
    });
  }

  return (
    <Box>
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogTitle>Nouveau Client</DialogTitle>
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
              if (!formData.lastname) {
                return;
              } else {
                handleClose(formData);
                reset();
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
CreateDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  customers: PropTypes.array,
};
