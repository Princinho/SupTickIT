import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
export const EditDialog = ({ open, handleClose, entry, categories }) => {
  const [formData, setFormData] = useState({ ...entry });
  const [touchedFields, setTouchedFields] = useState([]);
  useEffect(() => setFormData({ ...entry }), [entry]);
  return (
    <Box>
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogTitle>Modifier le Véhicule</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ marginTop: "1em" }}>
            <InputLabel id="clt-select-label">Catégorie</InputLabel>
            <Select
              labelId="clt-select-label"
              id="clt-select"
              value={formData.partCategoryId}
              error={!formData.partCategoryId}
              label="Catégorie"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  partCategoryId: e.target.value,
                }))
              }
            >
              {categories?.map((cat) => (
                <MenuItem key={`cat-${cat.id}`} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

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
              label="Prix Unitaire*"
              error={touchedFields.includes("price") && !formData.price}
              type="text"
              value={formData.price}
              onChange={(event) => {
                setTouchedFields((prev) => [...prev, "price"]);
                setFormData((prev) => ({ ...prev, price: event.target.value }));
              }}
              fullWidth
              variant="standard"
            />
            <FormControlLabel
              control={<Switch />}
              checked={formData.isLineEditAllowed}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  isLineEditAllowed: e.target.checked,
                }))
              }
              label="Modifiable"
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
  categories: PropTypes.array,
};
