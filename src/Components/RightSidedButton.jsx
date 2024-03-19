import { HighlightOff } from "@mui/icons-material";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

export const RightSidedButton = ({ handleCLick, children }) => {
  return (
    <Button
      sx={{
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: "50%",
        borderBottomLeftRadius: "50%",
        padding: 0,
        minWidth: "42px",
        paddingInline: "10px",
        borderRight: "none",
        "&:hover": { borderRight: "none" },
      }}
      variant="outlined"
      onClick={handleCLick}
    >
      {children || <HighlightOff />}
    </Button>
  );
};
RightSidedButton.propTypes = {
  handleCLick: PropTypes.func,
};
