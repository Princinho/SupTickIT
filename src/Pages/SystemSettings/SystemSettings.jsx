import { Grid, Paper, Stack, TextField, Typography } from "@mui/material"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { SimpleButton } from "../../Components/SimpleButton"
import { getSystemSettings, saveSystemSettings } from "../../Api"
import { useEffect, useState } from "react"
import { useAuthorization } from "../../Hooks/useAuthorization"
import { useNavigate } from "react-router-dom"

export const SystemSettings = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { isUserAuthorized } = useAuthorization()
    useEffect(() => {
        if (!isUserAuthorized()) {
            navigate("/accessdenied")
        }
    }, [])
    const BASE_QUERY_KEY = "system_settings"
    const { data: systemSettings, isLoading, isError } = useQuery({ queryKey: [BASE_QUERY_KEY], queryFn: getSystemSettings })
    // console.log(systemSettings)
    const [settings, setSettings] = useState({ ...systemSettings })
    console.log(settings)
    const updateMutation = useMutation({
        mutationFn: saveSystemSettings,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
    })
    useEffect(() => setSettings({ ...systemSettings }), [systemSettings])
    const saveSettings = () => {
        updateMutation.mutate({ stringified: JSON.stringify(settings) })
    }
    return (<>
        <Typography variant="h3" mb={2}>Configurations système</Typography>
        {!isLoading && !isError && <Grid container>
            <Grid item component='paper'>
                <Paper sx={{ minHeight: '5em', minWidth: '15em', padding: '.5em 1em' }}>
                    <Typography variant="h6">Désignation de la référence produit</Typography>
                    <TextField
                        autoFocus
                        margin="dense"
                        type="text"
                        value={settings?.productRefLabel}
                        onChange={event => setSettings(prev => ({ ...prev, productRefLabel: event.target.value }))}
                        fullWidth
                        variant="standard"
                    />
                </Paper>
            </Grid>
        </Grid>}
        <Stack direction='row' justifyContent='flex-end'>

            <SimpleButton handleClick={saveSettings} text={'Enregistrer'} />
        </Stack>
    </>
    )
}
