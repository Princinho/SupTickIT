
import { Box } from '@mui/material'
import PropTypes from "prop-types"
export const Dot = ({ color, borderColor }) => {
    return (
        <Box component='div' minHeight='1em' minWidth='1em'
            height='1em' width='1em'
            sx={{ backgroundColor: color, border: `2px solid ${borderColor}` }}
            borderRadius='50%'
        ></Box>
    )
}
Dot.propTypes = {
    color: PropTypes.string.isRequired,
    borderColor: PropTypes.string.isRequired,
}