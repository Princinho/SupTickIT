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
import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import { formatToInput } from "../../utils";
import { PictureAsPdfSharp, Print } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
export const DetailsDialog = ({
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
  const navigate = useNavigate();
  const [touchedFields, setTouchedFields] = useState([]);
  const [partsIncluded] = useState([...entry.quoteDetails]);
  useEffect(() => {
    console.log(formData.vehicleId);
    const newVehicle = vehicles?.find((v) => v.id == formData?.vehicleId);
    const owner = customers?.find((c) => c.id == newVehicle?.customerId);
    setFormData((prev) => ({
      ...prev,
      customerId: owner?.id || "",
    }));
  }, [formData.vehicleId, customers, vehicles]);

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
  console.log("parts", parts);
  return (
    <Box>
      <Dialog open={open} fullScreen onClose={() => handleClose()}>
        <DialogTitle>Details du devis</DialogTitle>
        <DialogContent>
          <Stack direction={{ sm: "row" }} alignItems="flex-end" gap={2}>
            <Autocomplete
              size="small"
              sx={{ marginBottom: ".2em" }}
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
            <Button
              size="large"
              variant="contained"
              onClick={() =>
                navigate("/exportquotepdf", {
                  state: { entry, vehicle, customer, parts },
                })
              }
            >
              <Print sx={{ width: "1em", height: "1em" }} />
            </Button>
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
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
DetailsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  entry: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
  customers: PropTypes.array,
  vehicles: PropTypes.array,
  parts: PropTypes.array,
};
