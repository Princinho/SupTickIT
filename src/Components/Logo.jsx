import { Stack, Typography } from '@mui/material'

export const Logo = () => {
    return (
        <Stack direction='row' justifyContent='flex-start'>
            <Typography variant="h3" fontWeight='bold' color='primary.dark'>Sup</Typography>
            <Typography variant="h3" fontWeight='bold' color='primary'>Tick</Typography>
            <Typography variant="h3" fontWeight='bold' color='primary.light'>It</Typography>
        </Stack>
    )
}
