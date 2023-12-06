import { Chip } from "@mui/material";
import { SYSTEM_ROLES } from "../../utils";


export const RoleChip = ({ roleId }) => {
    console.log(SYSTEM_ROLES)
    console.log(+roleId)
    let chip = null
    switch (+roleId) {
        case SYSTEM_ROLES.ADMIN:
            chip = <Chip size="medium" label="A" sx={{ fontWeight: 'bold' }} color="error" />
            break;
        case SYSTEM_ROLES.MODERATOR:
            chip = <Chip size="medium" label="M" sx={{ fontWeight: 'bold' }} color="warning" />
            break;
        case SYSTEM_ROLES.AGENT:
            chip = <Chip size="medium" label="a" sx={{ fontWeight: 'bold' }} color="lightblue" />
            break;
        case SYSTEM_ROLES.CUSTOMER:
            chip = <Chip size="medium" label="C" sx={{ fontWeight: 'bold' }} color="default" />
            break;
    }
    return (
        chip
    )
}
