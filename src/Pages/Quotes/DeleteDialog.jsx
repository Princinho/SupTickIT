import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { Remove } from "@mui/icons-material";
import { formatToInput } from "../../utils";
export const DeleteDialog = ({
  open,
  entry,
  customers,
  vehicles,
  parts,
  handleClose,
}) => {
  const init = {
    ...entry,
    mileage: "",
  };

  const [formData, setFormData] = useState({
    ...init,
  });
  const partsInit = {
    quantity: 1,
    pricePerUnit: 0,
    totalPrice: 0,
    part: {},
  };
  const [touchedFields, setTouchedFields] = useState([]);
  const [partsIncluded, setPartsIncluded] = useState([...entry.quoteDetails]);
  const [currentPart, setCurrentPart] = useState({ ...partsInit });

  useEffect(() => {
    console.log(formData.vehicleId);
    const newVehicle = vehicles?.find((v) => v.id == formData?.vehicleId);
    const owner = customers?.find((c) => c.id == newVehicle?.customerId);
    setFormData((prev) => ({
      ...prev,
      customerId: owner?.id || "",
    }));
  }, [formData.vehicleId, customers, vehicles]);

  function currentPartValid() {
    return (
      currentPart.part &&
      currentPart.pricePerUnit > 0 &&
      currentPart.quantity > 0
    );
  }
  function addCurrentPartToIncludedParts() {
    setPartsIncluded((prev) => [
      ...prev,
      { ...currentPart, partId: currentPart.part.id },
    ]);
    setCurrentPart({ ...partsInit });
  }
  function RemovePart(id) {
    setPartsIncluded((prev) => prev.filter((p) => p.partId != id));
  }
  function saveQuote() {
    let result = {
      ...formData,
      date: new Date(formData.date).toISOString(),
      quoteDetails: [...partsIncluded],
    };
    console.log(result);
    handleClose(result);
    // reset();
  }
  const total = useMemo(
    () =>
      partsIncluded
        ?.map(({ quantity, pricePerUnit }) => quantity * pricePerUnit)
        .reduce((prev, curr) => prev + curr, 0),
    [partsIncluded]
  );
  const vehicle = useMemo(
    () => vehicles?.find((v) => v.id == formData?.vehicleId),
    [vehicles, formData?.vehicleId]
  );
  const customer = useMemo(
    () => customers?.find((c) => c.id == formData?.customerId),
    [customers, formData?.customerId]
  );
  console.log("included", partsIncluded);
  return (
    <Box>
      <Dialog open={open} fullScreen onClose={() => handleClose()}>
        <DialogTitle>Modifier le devis</DialogTitle>
        <DialogContent>
          <Stack direction={{ sm: "row" }} gap={2}>
            <Autocomplete
              size="small"
              sx={{ marginTop: "1em" }}
              disabled
              value={{
                id: formData.vehicleId,
                label: vehicles?.find((v) => v.id == formData.vehicleId)?.vin,
              }}
              isOptionEqualToValue={(opt, val) => opt.id == val?.id}
              onChange={(e, newValue) => {
                setFormData((prev) => {
                  return {
                    ...prev,
                    vehicleId: newValue?.id || "",
                    vehicle: newValue,
                  };
                });
              }}
              getOptionLabel={(option) => option?.label || ""}
              fullWidth
              disablePortal
              options={
                vehicles?.map((p) => ({
                  label: p.vin,
                  id: p.id,
                })) || []
              }
              renderInput={(params) => (
                <TextField {...params} label="Chassis" />
              )}
            />
            <TextField
              autoFocus
              margin="dense"
              disabled
              label="Kilométrage*"
              error={touchedFields.includes("mileage") && !formData.mileage}
              type="number"
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
            <TextField
              autoFocus
              margin="dense"
              label="Référence*"
              error={
                touchedFields.includes("referenceNumber") &&
                !formData.referenceNumber
              }
              disabled
              type="text"
              value={formData.referenceNumber}
              onChange={(event) => {
                setTouchedFields((prev) => [...prev, "referenceNumber"]);
                setFormData((prev) => ({
                  ...prev,
                  referenceNumber: event.target.value,
                }));
              }}
              fullWidth
              variant="standard"
            />
            <TextField
              margin="dense"
              id="date"
              type="date"
              disabled
              value={
                formData.date ? formatToInput(new Date(formData.date)) : ""
              }
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, date: event.target.value }))
              }
              aria-label="Date"
              label="Date"
              size="small"
              variant="standard"
              fullWidth
            />
          </Stack>
          <Divider />
          <Stack
            paddingTop={1}
            direction="row"
            alignItems="center"
            gap={{ xs: "1em", md: "3em" }}
          >
            {/* <Typography fontWeight="bold">Pièces</Typography> */}
            {vehicle && (
              <Typography>
                {vehicle?.make} {vehicle?.model} {vehicle?.year}{" "}
                {vehicle?.color}
              </Typography>
            )}
            <Divider orientation="vertical" sx={{ height: "3em" }} />
            {customer && (
              <Typography>
                {customer?.firstname} {customer?.lastname} {customer?.phone}
              </Typography>
            )}
          </Stack>

          <Divider sx={{ marginBlock: "1em" }} />
          {/* Pièces actuellement ajoutées */}
          {partsIncluded.map((pIncl) => (
            <Grid
              key={"part-included" + pIncl.partId}
              container
              spacing={5}
              mb={2}
              alignItems="center"
            >
              <Grid item xs={5}>
                <Typography>
                  {parts?.find((part) => part.id == pIncl.partId)?.name}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{pIncl.quantity}</Typography>
              </Grid>
              <Grid item xs={0} md={2}>
                <Typography>{pIncl.pricePerUnit}</Typography>
              </Grid>
              <Grid item xs={3}>
                <Stack direction="row" gap={2} justifyContent="space-between">
                  <Typography>{pIncl.pricePerUnit * pIncl.quantity}</Typography>
                </Stack>
              </Grid>
            </Grid>
          ))}
          <Stack direction="row" justifyContent="flex-end">
            <Typography>Total HT: {total}</Typography>
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
              console.log(formData);
              console.log(partsIncluded);
              handleClose(true);
            }}
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
  entry: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  customers: PropTypes.array,
  vehicles: PropTypes.array,
  parts: PropTypes.array,
};
