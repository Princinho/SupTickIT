import { Remove } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from "@mui/material";

import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import PropTypes from "prop-types";
import { useMemo, useState } from "react";
export const CreateDialog = ({ open, parts, handleClose }) => {
  const init = {
    name: "",
    description: "",
    isBonus: false,
    isEnabled: true,
    isPercentage: false,
    isForAllProducts: true,
    amount: 0,
  };
  const [partsSearchTerm, setPartsSearchTerm] = useState("");
  const [selectionMode, setSelectionMode] = useState("exclude");
  const [selectedPartIds, setSelectedPartIds] = useState([]);
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
  const availableParts = useMemo(
    () =>
      parts
        ?.filter((part) => !selectedPartIds.some((pId) => pId == part.id))
        .map((p) => ({ label: p.name, id: p.id })) || [],
    [selectedPartIds, parts]
  );
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  function getNormalizedData() {
    return formData.isForAllProducts
      ? formData
      : {
          ...formData,
          exclusionList:
            selectionMode == "exclude"
              ? selectedPartIds.toString()
              : parts
                  ?.filter((p) => !selectedPartIds.includes(p))
                  .map((p) => p.id)
                  .join(",")
                  .toString(),
        };
  }
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
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
          <FormControlLabel
            control={<Switch />}
            checked={formData.isForAllProducts}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isForAllProducts: e.target.checked,
              }))
            }
            label="Appliquer a tous les produits"
          />
          {!formData.isForAllProducts && (
            <>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <Autocomplete
                  size="small"
                  disabled={!parts}
                  value={null}
                  isOptionEqualToValue={(opt, val) => opt.id == val.id}
                  inputValue={partsSearchTerm}
                  onInputChange={(event, searchTerm) => {
                    setPartsSearchTerm(searchTerm);
                  }}
                  onChange={(e, newValue) => {
                    setSelectedPartIds((prev) => {
                      setPartsSearchTerm("");
                      return [...prev, newValue.id];
                    });
                  }}
                  getOptionLabel={(option) => option?.label || ""}
                  fullWidth
                  disablePortal
                  id="parts-dropdown"
                  options={availableParts}
                  renderInput={(params) => (
                    <TextField {...params} label="Produits" />
                  )}
                />
                <ToggleButtonGroup
                  color="primary"
                  value={selectionMode}
                  size="small"
                  exclusive
                  onChange={(event) => setSelectionMode(event.target.value)}
                  aria-label="Platform"
                >
                  <ToggleButton value="exclude">Exclure</ToggleButton>
                  <ToggleButton value="include">Inlcure</ToggleButton>
                </ToggleButtonGroup>
              </Stack>
              <Divider sx={{ marginBlock: "1em" }} />
              <Typography>Produits selectionnés</Typography>
              <Divider sx={{ marginBlock: "1em" }} />
              <TableContainer sx={{ marginTop: 2 }} component={Paper}>
                <Table size="small" aria-label="selected parts table">
                  {/* <TableHead>
                    <TableRow>
                      <StyledTableCell>Pièce</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead> */}
                  <TableBody>
                    {selectedPartIds.map((pId) => (
                      <StyledTableRow key={"selected-part-table-row" + pId}>
                        <StyledTableCell
                          component="th"
                          sx={{ width: "80%" }}
                          scope="row"
                        >
                          {parts.find((part) => part.id == pId).name}
                        </StyledTableCell>
                        <StyledTableCell component="th" scope="row">
                          <IconButton
                            onClick={() =>
                              setSelectedPartIds((prev) =>
                                prev.filter((id) => id != pId)
                              )
                            }
                          >
                            <Remove />
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
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
                const data = getNormalizedData(formData);
                console.log(data);
                handleClose(data);
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
  parts: PropTypes.array,
};
