import { Box, Paper, Stack } from "@mui/material"


export const Test = () => {
    return (
        <Box>
            <Stack height='90vh' direction='column'>
                <Box sx={{ backgroundColor: 'red', minHeight: '64px' }}></Box>
                <Box sx={{ backgroundColor: 'blue',overflowY:'scroll',flexGrow:1 }} >
                    <Paper sx={{minHeight:'30vh'}}>Hellow</Paper>
                    <Paper sx={{minHeight:'30vh'}}>Hellow</Paper>
                    <Paper sx={{minHeight:'30vh'}}>Hellow</Paper>
                    <Paper sx={{minHeight:'30vh'}}>Hellow</Paper>
                    <Paper sx={{minHeight:'30vh'}}>Hellow</Paper>
                </Box>
                <Box sx={{ backgroundColor: 'green', minHeight: '64px' }}></Box>
            </Stack>
        </Box>
    )
}
