import { Chip } from "@mui/material"
import { PropTypes } from "prop-types"
import { TICKET_PRIORITY } from "../utils"
export const PriorityTag = ({ priority, size }) => {
    switch (priority) {
        case TICKET_PRIORITY.NORMAL:
            return (
                <Chip size={size} label="Normale" color="default" />
            )
        case TICKET_PRIORITY.HIGH:
            return (
                <Chip size={size} label="Haute" color="lightblue" />
            )
        case TICKET_PRIORITY.CRITICAL:
            return (
                <Chip size={size} label="Critique" color="warning" />
            )
        default:
            return (
                <Chip size={size} label="Non définie" color="default" />
            )

    }

}
PriorityTag.propTypes = {
    priority: PropTypes.number,
    size: PropTypes.string
}