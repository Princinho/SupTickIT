import { Chip } from "@mui/material";
import { TICKET_STATUS } from "../utils";


export const TicketStatus = ({ status }) => {
    let chip = null
    switch (status) {
        case TICKET_STATUS.PENDING:
            chip = <Chip size="small" label="Non démarré" color="default" />
            break;
        case TICKET_STATUS.AWAITING_RESPONSE:
            chip = <Chip size="small" label="En attente de reponse" color="info" />
            break;
        case TICKET_STATUS.PROCESSING:
            chip = <Chip size="small" label="En cours" color="warning" />
            break;
        case TICKET_STATUS.PROCESSED:
            chip = <Chip size="small" label="Traité" variant="outlined" color="success" sx={{ borderWidth: '2px' }} />
            break;
        case TICKET_STATUS.CLOSED:
            chip = <Chip size="small" label="Fermé" color="success" sx={{ fontWeight: 'bold' }} />
            break;
        case TICKET_STATUS.REJECTED:
            chip = <Chip size="small" label="Non satisfait" color="error" sx={{ color: 'white' }} />
            break;
        case TICKET_STATUS.APPROVED:
            chip = <Chip size="small" label="Approuvé" color="success" sx={{ color: 'white' }} />
            break;

        default:
            chip = <Chip size="small" label="Non démarré" color="default" />
            break;
    }
    return (
        chip
    )
}
