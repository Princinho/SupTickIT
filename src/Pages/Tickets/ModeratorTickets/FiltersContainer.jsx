import { RestartAlt } from "@mui/icons-material"
import { Box, Button, Checkbox, FormControlLabel, Link, Stack, TextField, Typography } from "@mui/material"
import { Dot } from "../../../Components/Dot"

export const FiltersContainer = () => {
    return (
        <Stack>
            <Stack direction='row' mb={2} justifyContent='space-between'>
                <Typography variant="h5" fontWeight='bold'>Filtrer les tickets</Typography>
                <Button variant="outlined" size="small" color="warning"><RestartAlt color="warning" /></Button>
            </Stack>
            <Stack direction='row' mb={2} justifyContent='space-between'>

                <Typography variant="body1" fontWeight='bold'>Filtrer par date</Typography>
                <Button variant="outlined" size="small" color="warning"><RestartAlt color="warning" /></Button>
            </Stack>
            <Stack direction='row' spacing={1} alignItems='center' justifyContent='space-between'>
                <Typography variant="subtitle2">Du</Typography>
                <TextField id="start-date" type="date" size='small' aria-label="Du" variant="outlined" />
                <Typography variant="subtitle2">Au</Typography>
                <TextField id="end-date" type="date" aria-label="Au" size='small' variant="outlined" />
            </Stack>
            <FormControlLabel
                control={
                    <Checkbox name="showClosed" />
                }
                label="Inclure les tickets fermés"
                sx={{ marginBottom: '1em' }}
            />
            <Stack direction='row' mb={2} justifyContent='space-between'>

                <Typography variant="body1" fontWeight='bold'>Filtrer par agent</Typography>
                <Button variant="outlined" size="small" color="warning"><RestartAlt color="warning" /></Button>
            </Stack>
            <TextField id="search-by-agent"
                size="small" aria-label="Filtrer par agent"
                label="Recherche agent" variant="outlined" sx={{ marginBottom: '1em' }} />
            <Stack mb={2} >
                <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                    control={
                        <Checkbox name="showClosed" />
                    }
                    label="Agent 001"
                />
                <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                    control={
                        <Checkbox name="showClosed" />
                    }
                    label="Agent 005"
                />
                <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                    control={
                        <Checkbox name="showClosed" />
                    }
                    label="Agent 007"
                />
                <Link>5 de plus</Link>
            </Stack>

            <Stack direction='row' mb={2} justifyContent='space-between'>

                <Typography variant="body1" fontWeight='bold'>Filtrer par client</Typography>
                <Button variant="outlined" size="small" color="warning"><RestartAlt color="warning" /></Button>
            </Stack>
            <TextField id="search-by-client"
                size="small" aria-label="Filtrer par client"
                label="Recherche client" variant="outlined" sx={{ marginBottom: '1em' }} />
            <Stack mb={2} >
                <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                    control={
                        <Checkbox name="showClosed" />
                    }
                    label="Client 001"
                />
                <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                    control={
                        <Checkbox name="showClosed" />
                    }
                    label="Client 005"
                />
                <FormControlLabel sx={{ '& .MuiCheckbox-root': { paddingBlock: '.2em' } }}
                    control={
                        <Checkbox name="showClosed" />
                    }
                    label="Client 007"
                />
                <Link>5 de plus</Link>
            </Stack>
            <Stack direction='row' mb={2} justifyContent='space-between'>

                <Typography variant="body1" fontWeight='bold'>Priorité et statut</Typography>
                <Button variant="outlined" size="small" color="warning"><RestartAlt color="warning" /></Button>
            </Stack>
            <Stack direction='row'>
                <Box sx={{}}></Box>
                <Box></Box>
            </Stack>
            <Dot color="error"/>
           
        </Stack>

    )
}
