import { Chip } from "@mui/material";
import { SYSTEM_ROLES } from "../utils";


export const RoleChip = ({ roleId, handleClick }) => {
    let chip = null
    switch (+roleId) {
        case SYSTEM_ROLES.ADMIN:
            chip = <Chip size="small" label="A" sx={{ fontWeight: 'bold', fontSize: '.8em' }} onClick={handleClick} color="error" />
            break;
        case SYSTEM_ROLES.MODERATOR:
            chip = <Chip size="small" label="M" sx={{ fontWeight: 'bold', fontSize: '.8em' }} onClick={handleClick} color="warning" />
            break;
        case SYSTEM_ROLES.AGENT:
            chip = <Chip size="small" label="A" sx={{ fontWeight: 'bold', fontSize: '.8em' }} onClick={handleClick} color="lightblue" />
            break;
        case SYSTEM_ROLES.CUSTOMER:
            chip = <Chip size="small" label="C" sx={{ fontWeight: 'bold', fontSize: '.8em' }} onClick={handleClick} color="default" />
            break;
        case SYSTEM_ROLES.CUSTOMER_ADMIN:
            chip = <Chip size="small" label="A" sx={{ fontWeight: 'bold', fontSize: '.8em' }} onClick={handleClick} color="default" />
            break;
    }
    return (
        chip
    )
}
