import { Box, Button, Checkbox, FormControlLabel, Link, Paper, Stack, TextField, Typography } from "@mui/material"
import bgImage from "../../assets/login-background.jpg"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { Logo } from "../../Components/Logo"
import { useContext, useState } from "react"
import { DataContext, UserContext } from "../../Contexts"
export const Login = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState(null)
  const [error, setError] = useState(null)
  const { sampleData } = useContext(DataContext)

  function login() {
    console.log(credentials)
    setError(false)
    let matchingUser = sampleData.users.find(u => u.email == credentials.email && u.password == credentials.password)
    if (matchingUser) {
      setUser(matchingUser)
      navigate('/')
    }
    else {
      setError(true)
    }
  }

  if (user) { navigate('/projects') }
  else {
    return (
      <form>
        <Stack
          direction='row'
          sx={{
            minHeight: '100vh', backgroundImage: `url(${bgImage})`, backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            justifyContent: { xs: 'center', md: 'flex-start' },
            alignItems: { xs: 'center', lg: 'stretch' },
            paddingInline: { xs: '5vw', lg: 0 }
          }}>
          <Paper sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
            <Stack sx={{ minWidth: { xs: '70vw', sm: '50vw', md: '40vw' }, minHeight: '80vh', paddingInline: '2em' }}
              spacing={4} justifyContent='center' alignItems='center'>
              <Logo />
              <Box width='60%'>
                <Typography variant="h4">Bienvenue!</Typography>
                <Typography variant="subtitle1">Connectez vous pour avoir accès complet aux fonctionnalités !</Typography>
              </Box>

              <Stack direction='column' width='100%' spacing={2} alignItems='center'>
                <TextField variant="outlined" error={error} label="Email (Utilisez spadmin@gmail.com)"
                  sx={{ minWidth: '60%' }}
                  onChange={event => setCredentials(prev => ({ ...prev, email: event.target.value }))}
                ></TextField>
                <TextField variant="outlined" error={error} label="Mot de passe(Utilisez Admin123#)" type="password" sx={{ minWidth: '60%' }}
                  onChange={event => setCredentials(prev => ({ ...prev, password: event.target.value }))}></TextField>
                <Button variant="contained" sx={{ fontWeight: 'bold' }}
                  onClick={login}
                >Connexion</Button>
                <Stack sx={{
                  flexDirection: { xs: 'column', lg: 'row' },
                  alignItems: 'center',
                  justifyContent: { lg: 'space-between' }
                }} width='60%'>
                  <FormControlLabel control={<Checkbox defaultChecked />} label="Se souvenir de moi" />
                  <Link underline="hover" variant="body2" component={RouterLink} to="/forgotPassword">Mot de passe oublié?</Link>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Stack>
      </form>
    )
  }
}
