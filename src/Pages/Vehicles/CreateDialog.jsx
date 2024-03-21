import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
export const CreateDialog = ({ open, customers, handleClose }) => {
  const init = {
    customerId: "",
    vin: "",
    plateNumber: "",
    make: "",
    model: "",
    year: "",
    color: "",
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
        <DialogTitle>Nouveau Véhicule</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginTop: "1em" }}>
            <InputLabel id="clt-select-label">Client</InputLabel>
            <Select
              labelId="clt-select-label"
              id="clt-select"
              value={formData.customerId}
              error={touchedFields.includes("make") && !formData.customerId}
              label="Age"
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, customerId: e.target.value }))
              }
            >
              {customers?.map((clt) => (
                <MenuItem key={`clt-${clt.id}`} value={clt.id}>
                  {clt.firstname + " " + clt.lastname}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Stack direction={{ sm: "row" }} gap={2}>
            <TextField
              autoFocus
              margin="dense"
              label="Marque*"
              error={touchedFields.includes("make") && !formData.make}
              type="text"
              value={formData.make}
              onChange={(event) => {
                setTouchedFields((prev) => [...prev, "make"]);
                setFormData((prev) => ({ ...prev, make: event.target.value }));
              }}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              label="Modèle*"
              error={touchedFields.includes("model") && !formData.model}
              type="text"
              value={formData.model}
              onChange={(event) => {
                setTouchedFields((prev) => [...prev, "model"]);
                setFormData((prev) => ({ ...prev, model: event.target.value }));
              }}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              label="Année*"
              error={touchedFields.includes("year") && !formData.year}
              type="text"
              value={formData.year}
              onChange={(event) => {
                setTouchedFields((prev) => [...prev, "year"]);
                setFormData((prev) => ({ ...prev, year: event.target.value }));
              }}
              fullWidth
              variant="standard"
            />
          </Stack>
          <Stack direction={{ sm: "row" }} gap={2}>
            <TextField
              autoFocus
              margin="dense"
              label="Num Chassis*"
              error={touchedFields.includes("vin") && !formData.vin}
              type="text"
              value={formData.vin}
              onChange={(event) => {
                setTouchedFields((prev) => [...prev, "vin"]);
                setFormData((prev) => ({ ...prev, vin: event.target.value }));
              }}
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              label="Immatriculation*"
              error={
                touchedFields.includes("plateNumber") &&
                (!formData.plateNumber || formData.plateNumber.length < 5)
              }
              type="text"
              value={formData.plateNumber}
              onChange={(event) => {
                setTouchedFields((prev) => [...prev, "plateNumber"]);
                setFormData((prev) => ({
                  ...prev,
                  plateNumber: event.target.value,
                }));
              }}
              fullWidth
              variant="standard"
            />
          </Stack>

          <TextField
            autoFocus
            margin="dense"
            label="Couleur*"
            error={touchedFields.includes("color") && !formData.color}
            type="text"
            value={formData.color}
            onChange={(event) => {
              setTouchedFields((prev) => [...prev, "color"]);
              setFormData((prev) => ({ ...prev, color: event.target.value }));
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
              if (!formData.make) {
                return;
              } else {
                console.log(formData);
                handleClose(formData);
              }
              reset();
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
