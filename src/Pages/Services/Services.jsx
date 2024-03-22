import { ArrowBack, ArrowForward, Search } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { MainTable } from "./MainTable";
import { useEffect, useState } from "react";
import { CreateDialog } from "./CreateDialog";
import { EditDialog } from "./EditDialog";
import { DeleteDialog } from "./DeleteDialog";

import {
  runWithProgress,
  getAllParts,
  createPartAsync,
  editPartAsync,
  deletePartAsync,
  getAllServiceCategories,
} from "../../Api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RightSidedButton } from "../../Components/RightSidedButton";
import { sortAndFilterData } from "../../utils";

export const Services = () => {
  const BASE_QUERY_KEY = "services";
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [entryToEdit, setEntryToEdit] = useState(null);
  const [entryToDelete, setEntryToDelete] = useState(null);
  const [sortOption, setSortOption] = useState({ option: "name" });
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: services } = useQuery({
    queryKey: [BASE_QUERY_KEY],
    queryFn: getAllParts,
  });

  const { data: categories } = useQuery({
    queryKey: ["servicecategories"],
    //TODO: Renommer servicecategories en partscategories
    queryFn: getAllServiceCategories,
  });

  const [tableOptions, setTableOptions] = useState({
    rowsPerPage: 5,
    page: 0,
    count: services?.length || 0,
    handlePageChange: setCurrentPage,
    handleRowsPerPageChange: changeRowsPerPage,
  });
  useEffect(() => {
    setTableOptions((prev) => ({ ...prev, count: services?.length || 0 }));
  }, [services]);
  // const { isUserAuthorized } = useAuthorization();
  // useEffect(() => {
  //   if (!isUserAuthorized()) {
  //     navigate("/accessdenied");
  //   }
  // }, []);
  function changeRowsPerPage(rowsPerPage) {
    setRowsPerPage(rowsPerPage);
    setCurrentPage(0);
  }
  function showEditDialog(category) {
    setIsEditDialogOpen(true);
    setEntryToEdit(category);
  }
  function showDeleteDialog(category) {
    setIsDeleteDialogOpen(true);
    setEntryToDelete(category);
  }

  function setRowsPerPage(rowsPerPage) {
    setTableOptions((prev) => ({ ...prev, rowsPerPage }));
  }
  function setCurrentPage(page) {
    setTableOptions((prev) => ({ ...prev, page }));
  }

  const createMutation = useMutation({
    mutationFn: runWithProgress,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] }),
  });
  const editMutation = useMutation({
    mutationFn: runWithProgress,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] });
      console.warn("Invalidated");
    },
  });
  const deleteMutation = useMutation({
    mutationFn: runWithProgress,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] }),
  });
  return (
    <Paper sx={{ padding: "1em", paddingRight: 0, flexGrow: 1 }} elevation={2}>
      <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
        Pièces
      </Typography>
      <Stack direction="row" mb={2}>
        <Typography color="text.secondary" sx={{ fontWeight: "bold" }}>
          Menu /
        </Typography>
        <Typography color="primary.light" sx={{ fontWeight: "bold" }}>
          &nbsp;Pièces
        </Typography>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={5}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              variant="contained"
              onClick={() => setIsCreateDialogOpen(true)}
              sx={{
                color: "white",
                background: (theme) => theme.palette.primary.light,
                textTransform: "none",
              }}
            >
              Ajouter
            </Button>

            <FormControl sx={{ minWidth: "40%" }} size="small">
              <InputLabel id="demo-simple-select-label">Trier par</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Options"
                value={sortOption?.option}
                onChange={(event) =>
                  setSortOption({ option: event.target.value })
                }
              >
                <MenuItem value={"name"}>Nom</MenuItem>
                <MenuItem value={"id"}>Id</MenuItem>
                <MenuItem value={"dateCreated"}>Date</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Stack
            direction="row"
            width="100%"
            spacing={{ xs: 1, sm: 2 }}
            justifyContent={{ xs: "flex-start", sm: "flex-end" }}
          >
            <TextField
              id="categories-index-search-box"
              size="small"
              sx={{ minWidth: "30%" }}
              onChange={(event) => setSearchTerm(event.target.value)}
              aria-label="search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl sx={{ minWidth: "15%" }} size="small">
              <InputLabel id="demo-simple-select-label">Eléments</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Options"
                value={tableOptions.rowsPerPage}
                onChange={(event) => changeRowsPerPage(event.target.value)}
              >
                <MenuItem value={-1}>All</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={25}>25</MenuItem>
              </Select>
            </FormControl>

            <ButtonGroup
              variant="outlined"
              aria-label="outlined primary button group"
            >
              <Button
                disabled={tableOptions.page == 0}
                onClick={() => setCurrentPage(tableOptions.page - 1)}
              >
                <ArrowBack />
              </Button>
              <Button
                disabled={
                  tableOptions.page >=
                  Math.ceil(tableOptions.count / tableOptions.rowsPerPage) - 1
                }
                onClick={() => setCurrentPage(tableOptions.page + 1)}
              >
                <ArrowForward />
              </Button>
            </ButtonGroup>

            <RightSidedButton />
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ marginRight: "1em", mt: 2 }}>
        <MainTable
          options={tableOptions}
          categories={categories}
          services={sortAndFilterData(services, searchTerm, sortOption)}
          showEditDialog={showEditDialog}
          showDeleteDialog={showDeleteDialog}
        />
      </Box>
      <CreateDialog
        open={isCreateDialogOpen}
        services={services}
        categories={categories}
        handleClose={(cat) => {
          if (cat) {
            createMutation.mutate({
              data: cat,
              func: createPartAsync,
            });
          }
          setIsCreateDialogOpen(false);
        }}
      />
      {entryToEdit && (
        <EditDialog
          open={isEditDialogOpen}
          services={services}
          categories={categories}
          entry={entryToEdit}
          handleClose={(cat) => {
            if (cat) {
              editMutation.mutate({
                data: cat,
                func: editPartAsync,
              });
            }
            setIsEditDialogOpen(false);
          }}
        />
      )}
      {entryToDelete && (
        <DeleteDialog
          open={isDeleteDialogOpen}
          entry={entryToDelete}
          categories={categories}
          handleClose={(confirm) => {
            if (confirm) {
              deleteMutation.mutate({
                data: entryToDelete.id,
                func: deletePartAsync,
              });
            }
            setIsDeleteDialogOpen(false);
          }}
        />
      )}
    </Paper>
  );
};
