import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'

export const Dot = ({ color }) => {
    let theme = useTheme()
    let warning = theme.palette.warning
    console.log(warning)
    return (
        <Box component='span'
            height='1em' width='1em' sx={{ backgroundColor: 'red' }}
            borderRadius='50%'
        ></Box>
    )
}
