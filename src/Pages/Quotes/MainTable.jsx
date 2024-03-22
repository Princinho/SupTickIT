import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import { useState } from "react";

export const MainTable = ({
  quotes,
  showEditDialog,
  showDeleteDialog,
  showDetailsDialog,
  customers,
  vehicles,
  options,
}) => {
  function handleClose() {
    setAnchorEl(null);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const [focusedEntry, setFocusedEntry] = useState(null);
  const appMoreMenuOpen = Boolean(anchorEl);
  const { page, rowsPerPage, handlePageChange, handleRowsPerPageChange } =
    options;
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - quotes.length) : 0;
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 320 }} size="small" aria-label="list of quotes">
          <TableHead>
            <TableRow>
              <TableCell align="left">Reference</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Client</TableCell>
              <TableCell align="left">Vehicule</TableCell>
              <TableCell align="left">Total TTC</TableCell>
              <TableCell align="left">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quotes?.length > 0 ? (
              quotes.map((entry) => {
                // console.log(users)
                const customer = customers?.find(
                  (c) => c.id == entry.customerId
                );
                const vehicle = vehicles?.find((c) => c.id == entry.customerId);

                return (
                  <TableRow
                    key={"devisnum" + entry.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                  >
                    <TableCell component="th" scope="row">
                      {entry.referenceNumber}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {entry.date}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {customer?.firstname + " " + customer?.lastname}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ cursor: "pointer", maxWidth: "30%" }}
                      width="30%"
                      onClick={() => showDetailsDialog(entry)}
                    >
                      <Typography
                        variant="span"
                        sx={{ my: 0, fontWeight: "bold" }}
                      >
                        {vehicle.make}&nbsp;
                        {vehicle.model}&nbsp;
                        {vehicle.year}&nbsp;
                        {vehicle.color}&nbsp;
                      </Typography>
                      <br />
                      <Typography
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: "1",
                          WebkitBoxOrient: "vertical",
                        }}
                        variant="span"
                      >
                        158218 Km
                      </Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {entry.totalWithTaxOrBonuses}
                    </TableCell>

                    <TableCell>
                      <IconButton
                        onClick={(event) => {
                          setFocusedEntry(entry);
                          setAnchorEl(event.currentTarget);
                        }}
                      >
                        <MoreVert />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    textAlign="center"
                  >
                    {" "}
                    Aucune donnée disponible
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                labelRowsPerPage="Eléments par page"
                colSpan={7}
                count={quotes?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: true,
                }}
                onPageChange={(event, newPage) => handlePageChange(newPage)}
                onRowsPerPageChange={(event) =>
                  handleRowsPerPageChange(parseInt(event.target.value, 10))
                }
                // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={appMoreMenuOpen}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            showEditDialog(focusedEntry);
          }}
        >
          <ListItemIcon>
            <Edit color="warning" fontSize="small" />
          </ListItemIcon>
          Modifier
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            showDeleteDialog(focusedEntry);
          }}
        >
          <ListItemIcon>
            <Delete color="error" fontSize="small" />
          </ListItemIcon>
          Supprimer
        </MenuItem>
      </Menu>
    </>
  );
};
MainTable.propTypes = {
  customers: PropTypes.array.isRequired,
  quotes: PropTypes.array.isRequired,
  vehicles: PropTypes.array.isRequired,
  showEditDialog: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  showDetailsDialog: PropTypes.func.isRequired,
  showDeleteDialog: PropTypes.func.isRequired,
};
