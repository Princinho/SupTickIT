import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

import { useTheme } from "@emotion/react";
export const CreateDialog = ({ open, handleClose, companies }) => {
  //TODO: Faire bosser la pagination
  const [formData, setFormData] = useState({ title: "", description: "" });
  const theme = useTheme();
  const [formErrors, setFormErrors] = useState([]);
  const [selectedCompanies, setSelectedCompanies] = useState([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  function handleChange(event) {
    console.log(event.target.value);
    setSelectedCompanies(event.target.value);
  }
  function getStyles(id, selectedCompanies) {
    return {
      fontWeight:
        selectedCompanies.indexOf(id) === -1
          ? { fontWeight: "bold" }
          : { fontWeight: "normal" },
    };
  }
  return (
    <Box>
      <Dialog open={open} onClose={() => handleClose()}>
        <DialogTitle>Nouveau Projet</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Nom *"
            error={formErrors.length > 0}
            type="text"
            value={formData.title}
            onChange={(event) =>
              setFormData((prev) => ({ ...prev, title: event.target.value }))
            }
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            label="Désignation de la réference produit *"
            error={formErrors.length > 0}
            type="text"
            value={formData.productReferenceName}
            onChange={(event) =>
              setFormData((prev) => ({
                ...prev,
                productReferenceName: event.target.value,
              }))
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

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              marginBlock: "1em",
              gap: 0.5,
            }}
          >
            {selectedCompanies.map((value) => (
              <Chip
                key={value}
                label={companies.find((c) => c.id == value)?.name}
                onDelete={() =>
                  setSelectedCompanies((prev) =>
                    prev.filter((c) => c !== value)
                  )
                }
              />
            ))}
          </Box>
          <FormControl fullWidth sx={{ marginTop: "1em" }}>
            <InputLabel id="selected-companies-label">
              Entreprises participantes
            </InputLabel>
            <Select
              labelId="selected-companies-label"
              id="companies-select"
              multiple
              fullWidth
              value={selectedCompanies}
              onChange={handleChange}
              input={
                <OutlinedInput
                  id="select-multiple-chip"
                  label="Entreprises participantes"
                />
              }
              MenuProps={MenuProps}
            >
              {companies.map((company) => (
                <MenuItem
                  key={company.id}
                  value={company.id}
                  style={getStyles(company.id, companies)}
                >
                  {company.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setFormErrors([]);
              handleClose();
            }}
          >
            Annuler
          </Button>
          <Button
            onClick={() => {
              let keys = ["title", "productReferenceName"];
              keys.forEach((key) => {
                if (!formData[key]) {
                  setFormErrors((prev) => [...prev, key]);
                } else {
                  setFormErrors((prev) => prev.filter((k) => k != key));
                }
              });
              if (!formErrors.length > 0)
                handleClose({ ...formData, companyIds: selectedCompanies });
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
  companies: PropTypes.array,
};
