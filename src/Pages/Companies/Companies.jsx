import {
  ArrowBack,
  ArrowForward,
  HighlightOff,
  Search,
} from "@mui/icons-material";
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
import { CompaniesTable } from "./CompaniesTable";
import { useState } from "react";
import { CreateDialog } from "./CreateDialog";
import { EditDialog } from "./EditDialog";
import { DeleteDialog } from "./DeleteDialog";
import { sortAndFilterData } from "./utils";
import { DetailsDialog } from "./DetailsDialog";
import {
  createCompany,
  deleteCompany,
  editCompany,
  getAllCompaniesAsync,
  runWithProgress,
} from "../../Api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RightSidedButton } from "../../Components/RightSidedButton";

export const Companies = () => {
  // TODO: Add company creation date and company subscription date.

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState(null);
  const [companyToDetail, setCompanyToDetail] = useState(null);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [sortOption, setSortOption] = useState({ option: "name" });
  const BASE_QUERY_KEY = "companies";
  // const [companies, setCompanies] = useState([])
  const queryClient = useQueryClient();
  const { data: companies } = useQuery({
    queryKey: [BASE_QUERY_KEY],
    queryFn: getAllCompaniesAsync,
  });

  const [tableOptions, setTableOptions] = useState({
    rowsPerPage: 5,
    page: 0,
    count: companies?.length,
    handlePageChange: setCurrentPage,
    handleRowsPerPageChange: changeRowsPerPage,
  });
  function changeRowsPerPage(rowsPerPage) {
    setRowsPerPage(rowsPerPage);
    setCurrentPage(0);
  }
  function showEditDialog(company) {
    setIsEditDialogOpen(true);
    setCompanyToEdit(company);
  }
  function showDeleteDialog(company) {
    setIsDeleteDialogOpen(true);
    setCompanyToDelete(company);
  }
  function showDetailsDialog(company) {
    setIsDetailsDialogOpen(true);
    setCompanyToDetail(company);
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
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] }),
  });
  const deleteMutation = useMutation({
    mutationFn: runWithProgress,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] }),
  });

  return (
    <Paper sx={{ padding: "1em", paddingRight: 0, flexGrow: 1 }} elevation={2}>
      <Typography variant="h5" component="span" sx={{ fontWeight: "bold" }}>
        Entreprises
      </Typography>
      <Stack direction="row" mb={2}>
        <Typography color="text.secondary" sx={{ fontWeight: "bold" }}>
          Menu /
        </Typography>
        <Typography color="primary.light" sx={{ fontWeight: "bold" }}>
          Entreprises
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
                {/* <MenuItem value={'dateCreated'}>Date</MenuItem> */}
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
              id="companies-index-search-box"
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
                sx={{}}
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
                sx={{}}
              >
                <ArrowForward />
              </Button>
            </ButtonGroup>

            <RightSidedButton />
          </Stack>
        </Grid>
      </Grid>
      <Box sx={{ marginRight: "1em", mt: 2 }}>
        <CompaniesTable
          options={tableOptions}
          companies={sortAndFilterData(companies, searchTerm, sortOption)}
          showDetailsDialog={showDetailsDialog}
          showEditDialog={showEditDialog}
          showDeleteDialog={showDeleteDialog}
        />
      </Box>
      <CreateDialog
        open={isCreateDialogOpen}
        handleClose={(company) => {
          if (company) {
            createMutation.mutate({ data: company, func: createCompany });
            // toast.promise(createCompany(company), { success: () => { console.log("Created successfully"); refetch(); toast("Simple toast") } })
          }
          setIsCreateDialogOpen(false);
        }}
      />
      {companyToEdit && (
        <EditDialog
          open={isEditDialogOpen}
          entry={companyToEdit}
          handleClose={(company) => {
            if (company) {
              editMutation.mutate({ data: company, func: editCompany });
            }
            setIsEditDialogOpen(false);
          }}
        />
      )}
      {companyToDetail && (
        <DetailsDialog
          open={isDetailsDialogOpen}
          entry={companyToDetail}
          handleClose={() => {
            setIsDetailsDialogOpen(false);
          }}
        />
      )}
      {companyToDelete && (
        <DeleteDialog
          open={isDeleteDialogOpen}
          entry={companyToDelete}
          handleClose={(company) => {
            if (company) {
              deleteMutation.mutate({ data: company, func: deleteCompany });
            }
            setIsDeleteDialogOpen(false);
          }}
        />
      )}
    </Paper>
  );
};
