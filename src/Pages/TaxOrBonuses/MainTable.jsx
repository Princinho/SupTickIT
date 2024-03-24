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
  services: taxOrBonuses,
  showEditDialog,
  showDeleteDialog,
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - taxOrBonuses.length) : 0;
  return (
    <>
      <TableContainer>
        <Table
          sx={{ minWidth: 320 }}
          size="small"
          aria-label="list of services"
        >
          <TableHead>
            <TableRow>
              <TableCell align="left">Designation</TableCell>
              <TableCell align="left">Type</TableCell>
              <TableCell align="left">Valeur</TableCell>
              <TableCell align="left">En Pourcentage</TableCell>
              <TableCell align="left">Activé</TableCell>
              <TableCell align="left">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taxOrBonuses?.length > 0 ? (
              taxOrBonuses.map((entry) => {
                return (
                  <TableRow
                    key={"appli" + entry.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    hover
                  >
                    <TableCell component="th" scope="row">
                      <Typography>{entry.name}</Typography>
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
                        {entry.description}
                      </Typography>
                    </TableCell>
                    <TableCell align="left">
                      <Typography
                        variant="span"
                        color={entry.isBonus ? "success" : "error"}
                        sx={{ my: 0 }}
                      >
                        {entry.isBonus ? "Avantage" : "Taxe"}
                      </Typography>
                      <br />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography>{entry.amount}</Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography>{entry.isPercentage ? "%" : "-"}</Typography>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Typography>{entry.enabled ? "Oui" : "Non"}</Typography>
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
                <TableCell colSpan={5}>
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
                colSpan={6}
                count={taxOrBonuses?.length || 0}
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
  services: PropTypes.array.isRequired,
  showEditDialog: PropTypes.func.isRequired,
  options: PropTypes.object.isRequired,
  showDeleteDialog: PropTypes.func.isRequired,
};
