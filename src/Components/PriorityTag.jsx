import { Chip } from "@mui/material"
import { PropTypes } from "prop-types"
import { TICKET_PRIORITY } from "../utils"
export const PriorityTag = ({ priority, size }) => {
    switch (priority) {
        case TICKET_PRIORITY.NORMAL:
            return (
                <Chip size={size} label="Normale" sx={{color:'white'}} color="primary" />
            )
        case TICKET_PRIORITY.HIGH:
            return (
                <Chip size={size} label="Haute" color="warning" />
            )
        case TICKET_PRIORITY.CRITICAL:
            return (
                <Chip size={size} label="Critique" color="error" />
            )
        default:
            return (
                <Chip size={size} label="Non définie" color="default" />
            )

    }

}
PriorityTag.propTypes = {
    priority: PropTypes.bool,
    size: PropTypes.string
}