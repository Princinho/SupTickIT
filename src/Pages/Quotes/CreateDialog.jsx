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
import { getNextQuoteRef } from "../../Api";
import { useQuery } from "@tanstack/react-query";
import { formatToInput } from "../../utils";
export const CreateDialog = ({
  open,
  customers,
  vehicles,
  parts,
  handleClose,
}) => {
  const init = {
    customerId: "",
    vehicleId: "",
    mileage: "",
    referenceNumber: "",
    vehicle: {},
    date: formatToInput(new Date()),
  };
  const {
    data: nextRef,
    isLoading: isLoadingRef,
    refetch: refetchRef,
  } = useQuery({
    queryKey: ["QuoteRef"],
    queryFn: getNextQuoteRef,
  });
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
  const [partsIncluded, setPartsIncluded] = useState([]);
  const [currentPart, setCurrentPart] = useState({ ...partsInit });
  useEffect(() => {
    setFormData((prev) => ({ ...prev, referenceNumber: nextRef }));
  }, [nextRef, isLoadingRef, formData.customerId]);
  useEffect(() => {
    console.log(formData.vehicleId);
    const newVehicle = vehicles?.find((v) => v.id == formData?.vehicleId);
    const owner = customers?.find((c) => c.id == newVehicle?.customerId);
    console.log(owner);
    setFormData((prev) => ({
      ...prev,
      customerId: owner?.id || "",
    }));
  }, [formData.vehicleId, customers, vehicles]);
  function reset() {
    setFormData({
      ...init,
    });
    refetchRef();
    setPartsIncluded([]);
  }
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
    reset();
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
        <DialogTitle>Nouveau Devis</DialogTitle>
        <DialogContent>
          <Stack direction={{ sm: "row" }} gap={2}>
            {/* <FormControl fullWidth sx={{ marginTop: "1em" }}>
              <InputLabel id="clt-select-label">Client</InputLabel>
              <Select
                size="small"
                labelId="clt-select-label"
                id="clt-select"
                value={formData.customerId}
                error={
                  touchedFields.includes("customerId") && !formData.customerId
                }
                label="Client"
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
            </FormControl> */}

            <Autocomplete
              size="small"
              sx={{ marginTop: "1em" }}
              disabled={!vehicles}
              value={formData.vehicle}
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
              id="parts-dropdown"
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
              disabled={isLoadingRef}
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
          {/* Ligne d'ajout de pièce */}
          <Grid
            container
            spacing={{ xs: 5, md: 1 }}
            alignItems={{ md: "flex-end" }}
            direction={{ xs: "column", md: "row" }}
          >
            <Grid item xs={12} md={5}>
              <Autocomplete
                size="small"
                disabled={!parts}
                value={currentPart.part}
                isOptionEqualToValue={(opt, val) => opt.id == val.id}
                onChange={(e, newValue) => {
                  console.log(newValue);
                  setCurrentPart((prev) => {
                    console.log("parts", parts);
                    return {
                      ...prev,
                      part: newValue,
                      pricePerUnit: newValue
                        ? parts.find((p) => p.id == newValue?.id).price
                        : 0,
                    };
                  });
                }}
                getOptionLabel={(option) => option?.label || ""}
                fullWidth
                disablePortal
                id="parts-dropdown"
                options={
                  parts
                    ?.filter(
                      (part) => !partsIncluded.some((p) => p.partId == part.id)
                    )
                    .map((p) => ({ label: p.name, id: p.id })) || []
                }
                renderInput={(params) => (
                  <TextField {...params} label="Pièce" />
                )}
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                autoFocus
                margin="dense"
                size="small"
                label="Quantité*"
                type="text"
                value={currentPart.quantity}
                onChange={({ target: { value } }) => {
                  setCurrentPart((prev) => ({
                    ...prev,
                    quantity: value,
                  }));
                }}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <TextField
                autoFocus
                margin="dense"
                size="small"
                label="Prix Unitaire*"
                type="text"
                value={currentPart.pricePerUnit}
                onChange={({ target: { value } }) => {
                  setCurrentPart((prev) => ({
                    ...prev,
                    pricePerUnit: value,
                  }));
                }}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Stack direction="row" gap={2} alignItems="flex-end">
                <TextField
                  autoFocus
                  margin="dense"
                  size="small"
                  label="Total*"
                  type="text"
                  value={currentPart.pricePerUnit * currentPart.quantity}
                  variant="standard"
                  fullWidth
                />
                <Button
                  // sx={{ height: "3em" }}
                  variant="contained"
                  size="small"
                  disabled={!currentPartValid()}
                  onClick={addCurrentPartToIncludedParts}
                >
                  <AddIcon />
                </Button>
              </Stack>
            </Grid>
          </Grid>
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
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => RemovePart(pIncl.partId)}
                  >
                    <Remove />
                  </Button>
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
            disabled={
              !partsIncluded ||
              partsIncluded.length == 0 ||
              !formData.customerId ||
              !formData.mileage ||
              !formData.date ||
              !formData.vehicleId
            }
            onClick={() => {
              console.log(formData);
              console.log(partsIncluded);
              saveQuote();
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
  parts: PropTypes.array,
};
