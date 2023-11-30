import { Box, Button, Divider, Stack, Typography } from "@mui/material"
import AccessDeniedImage from "../../assets/access-denied.svg"
import { Home, Login } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "../../Contexts"
export const AccessDenied = () => {
    const { setUser } = useContext(UserContext)
    const navigate = useNavigate()
    function redirecToHome() {
        navigate("/")
    }
    function logout() {
        setUser(null)
        navigate("/login")
    }
    return (
        <Stack sx={{ paddingInline: '2em', minHeight: '100vh' }} spacing={{ md: 4 }} direction={{ md: 'row' }} justifyContent={{ xs: 'center', sm: 'flex-start' }} alignItems='center'>
            <Box sx={{ height: { xs: '40vh', md: '60vh' }, minWidth: { xs: '80%', md: '50%' } }}>
                <img src={AccessDeniedImage} height='100%' alt="Illustration of a man standing next to a road block" />
            </Box>
            <Stack>
                <Typography variant="h3" textAlign='center'>Accès refusé</Typography>
                <Typography variant="body1" textAlign='center' mb={2}>Désolé, vous ne pouvez accéder à cette ressource.</Typography>

                <Typography textAlign='center' mt={2} mb={1} variant="body1">Vous pouvez continuer votre session avec vos identifiants actuels</Typography>
                <Button variant="contained" onClick={redirecToHome} startIcon={<Home />} disableElevation
                    sx={{ marginBottom: '2em', color: 'white', fontWeight: 'bold', backgroundColor: (theme) => theme.palette.primary.light }}>Accueil</Button>
                <Divider sx={{ width: '100%' }} />
                <Typography variant="h6" component='span' fontWeight='bold' textAlign='center'>OU</Typography>
                <Divider sx={{ width: '100%', mb: '1em' }} />

                <Typography textAlign='center' mb={1} variant="body1">Vous pouvez aussi vous connecter avec d&apos;autres indentifiants</Typography>
                <Button variant="contained" onClick={logout} startIcon={<Login />} disableElevation sx={{ marginBottom: '2em', color: 'white', fontWeight: 'bold' }} >Se reconnecter </Button>

            </Stack>

        </Stack>
    )
}
