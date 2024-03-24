import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
export const CreateDialog = ({ open, handleClose }) => {
  const init = {
    name: "",
    description: "",
    isBonus: false,
    isEnabled: false,
    isPercentage: false,
    amount: 0,
  };
  const [formData, setFormData] = useState({
    ...init,
  });
  const [touchedFields, setTouchedFields] = useState([]);
  function reset() {
    setFormData({
      ...init,
    });
    setTouchedFields([]);
  }
  return (
    <Box>
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogTitle>Nouvelle Entrée</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom*"
            error={touchedFields.includes("name") && !formData.name}
            type="text"
            value={formData.name}
            onChange={(event) => {
              setTouchedFields((prev) => [...prev, "name"]);
              setFormData((prev) => ({ ...prev, name: event.target.value }));
            }}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Description*"
            type="text"
            value={formData.description}
            onChange={(event) => {
              setFormData((prev) => ({
                ...prev,
                description: event.target.value,
              }));
            }}
            fullWidth
            variant="standard"
          />

          <Stack direction="row" alignItems="center" gap={2}>
            <TextField
              sx={{ flex: 2 }}
              autoFocus
              margin="dense"
              label="Valeur*"
              error={touchedFields.includes("amount") && !formData.amount}
              type="number"
              value={formData.amount}
              onChange={(event) => {
                setTouchedFields((prev) => [...prev, "amount"]);
                setFormData((prev) => ({
                  ...prev,
                  amount: event.target.value,
                }));
              }}
              fullWidth
              variant="standard"
            />
          </Stack>
          <FormControlLabel
            control={<Switch />}
            checked={!formData.isBonus}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isBonus: !e.target.checked,
              }))
            }
            label="A Déduire"
          />
          <FormControlLabel
            control={<Switch />}
            checked={formData.isPercentage}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isPercentage: e.target.checked,
              }))
            }
            label="En pourcentage"
          />
          <FormControlLabel
            control={<Switch />}
            checked={formData.isEnabled}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isEnabled: e.target.checked,
              }))
            }
            label="Activer"
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
              if (!formData.name || !formData.amount) {
                return;
              } else {
                console.log(formData);
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
  categories: PropTypes.array,
};
