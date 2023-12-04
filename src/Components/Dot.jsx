
import { Box } from '@mui/material'

export const Dot = ({ color, borderColor }) => {
    return (
        <Box component='div'
            height='1em' width='1em'
            sx={{ backgroundColor: color, border: `2px solid ${borderColor}` }}
            borderRadius='50%'
        ></Box>
    )
}
