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
export const CreateDialog = ({ open, customers, vehicles, handleClose }) => {
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
      <Dialog open={open} fullScreen onClose={() => handleClose()}>
        <DialogTitle>Nouveau Devis</DialogTitle>
        <DialogContent>
          <Stack direction={{ sm: "row" }} gap={2}>
            <FormControl fullWidth sx={{ marginTop: "1em" }}>
              <InputLabel id="clt-select-label">Client</InputLabel>
              <Select
                labelId="clt-select-label"
                id="clt-select"
                value={formData.customerId}
                error={
                  touchedFields.includes("customerId") && !formData.customerId
                }
                label="Age"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    customerId: e.target.value,
                  }))
                }
              >
                {customers?.map((clt) => (
                  <MenuItem key={`clt-${clt.id}`} value={clt.id}>
                    {clt.firstname + " " + clt.lastname}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: "1em" }}>
              <InputLabel id="clt-select-label">Véhicule</InputLabel>
              <Select
                labelId="clt-select-label"
                id="clt-select"
                value={formData.vehicleId}
                error={
                  touchedFields.includes("vehicleId") && !formData.vehicleId
                }
                label="Age"
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    vehicleId: e.target.value,
                  }))
                }
              >
                {vehicles?.map((vehicle) => (
                  <MenuItem key={`vehi-${vehicle.id}`} value={vehicle.id}>
                    {vehicle.make}&nbsp;
                    {vehicle.model}&nbsp;
                    {vehicle.year}&nbsp;
                    {vehicle.color}&nbsp;
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              autoFocus
              margin="dense"
              label="Kilométrage*"
              error={touchedFields.includes("mileage") && !formData.mileage}
              type="text"
              value={formData.mileage}
              onChange={(event) => {
                setTouchedFields((prev) => [...prev, "mileage"]);
                setFormData((prev) => ({
                  ...prev,
                  mileage: event.target.value,
                }));
              }}
              fullWidth
              variant="standard"
            />
          </Stack>
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
  vehicles: PropTypes.array,
};
