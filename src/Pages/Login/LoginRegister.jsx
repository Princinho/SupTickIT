import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, Link, MenuItem, Paper, Select, Stack, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import bgImage from "../../assets/login-background.jpg"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { Logo } from "../../Components/Logo"
import { useContext, useState } from "react"
import { UserContext } from "../../Contexts"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createUser, getAllCompanies, getAllUsers } from "../../Api"
export const LoginRegister = () => {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState(null)
  const [registrationFormData, setRegistrationFormData] = useState(null)
  const [error, setError] = useState(null)
  const [currentForm, setCurrentForm] = useState('login')
  const [errors, setErrors] = useState(null)

  const { data: companies } = useQuery({ queryKey: ['companies'], queryFn: getAllCompanies })
  const { data: users } = useQuery({ queryKey: ['users'], queryFn: getAllUsers })
  const queryClient = useQueryClient()

  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] })
  })
  function login() {

    console.log(credentials)
    setError(false)
    let matchingUser = users.find(u => u.username == credentials.username && u.password == credentials.password)
    if (matchingUser) {
      setUser(matchingUser)
      navigate('/')
    }
    else {
      setError(true)
    }
  }
  function register() {
    setErrors(null)
    console.log(registrationFormData)
    if (!registrationFormData.firstName) { setErrors(prev => ({ ...prev, 'firstName': true })) }
    if (!registrationFormData.lastName) { setErrors(prev => ({ ...prev, 'lastName': true })) }
    if (!registrationFormData.companyId) { setErrors(prev => ({ ...prev, 'companyId': true })) }
    if (!registrationFormData.username) { setErrors(prev => ({ ...prev, 'username': true })) }
    if (!registrationFormData.password) { setErrors(prev => ({ ...prev, 'password': true })) }
    if (!registrationFormData.passwordConfirmation) { setErrors(prev => ({ ...prev, 'passwordConfirmation': true })) }
    if (registrationFormData.password != registrationFormData.passwordConfirmation) {
      setErrors(prev => ({ ...prev, 'passwordConfirmation': true, password: true }))
    }
    console.log(errors)
    if (!errors) {
      // setSampleData(
      //   prev => ({ ...prev, users: [...prev.users, { ...registrationFormData, id: users?.length + 1 }] })
      // )
      createMutation.mutate(registrationFormData)
      setUser(registrationFormData)
      navigate('/')
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
              <ToggleButtonGroup
                color="primary"
                value={currentForm}
                exclusive
                onChange={(event) => setCurrentForm(event.target.value)}
                aria-label="Platform"
              >
                <ToggleButton value="login">Connexion</ToggleButton>
                <ToggleButton value="register">Inscription</ToggleButton>

              </ToggleButtonGroup>
              {currentForm == 'login' && <>
                <Box width='60%'>
                  <Typography variant="h4">Bienvenue!</Typography>
                  <Typography variant="subtitle1">Connectez vous pour un accès complet !</Typography>
                </Box>

                <Stack direction='column' width='100%' spacing={2} alignItems='center'>
                  <TextField variant="outlined" error={error} label="Email (Utilisez spadmin@gmail.com)"
                    sx={{ minWidth: '60%' }}
                    onChange={event => setCredentials(prev => ({ ...prev, username: event.target.value }))}
                  ></TextField>
                  <TextField variant="outlined" error={error} label="Mot de passe(Utilisez Admin123#)" type="password" sx={{ minWidth: '60%' }}
                    onChange={event => setCredentials(prev => ({ ...prev, password: event.target.value }))}></TextField>
                  <Button variant="contained" sx={{ fontWeight: 'bold', color: 'whitesmoke' }}
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
              </>}
              {currentForm == 'register' && <>
                <Box width='60%'>
                  <Typography variant="h4" textAlign='center'>Inscription!</Typography>
                  <Typography variant="subtitle1" textAlign='center'>Creez votre compte!</Typography>
                </Box>

                <Stack direction='column' width='100%' spacing={2} alignItems='center'>
                  <TextField variant="outlined" size="small" error={errors?.lastName} label="Nom"
                    sx={{ minWidth: '60%' }}
                    onChange={event => setRegistrationFormData(prev => ({ ...prev, lastName: event.target.value }))}
                  ></TextField>
                  <TextField variant="outlined" size="small" error={errors?.firstName} label="Prénoms"
                    sx={{ minWidth: '60%' }}
                    onChange={event => setRegistrationFormData(prev => ({ ...prev, firstName: event.target.value }))}
                  ></TextField>
                  <FormControl sx={{ minWidth: '60%' }} size="small">
                    <InputLabel id="company-select-label">Entreprise</InputLabel>
                    <Select
                      labelId="company-select-label"
                      error={errors?.companyId}
                      label="Entreprise"
                      value={registrationFormData?.companyId || ''}
                      onChange={event => setRegistrationFormData(prev => ({ ...prev, companyId: event.target.value }))}
                    >
                      {
                        companies.map(c => <MenuItem value={c.id} key={`company-${c.id}`}>{c.name}</MenuItem>)
                      }
                    </Select>
                  </FormControl>
                  <TextField variant="outlined" size="small" error={errors?.username} label="Email"
                    sx={{ minWidth: '60%' }} type="username"
                    onChange={event => setRegistrationFormData(prev => ({ ...prev, username: event.target.value }))}
                  ></TextField>
                  <TextField variant="outlined" size="small" error={errors?.password} label="Mot de passe" type="password" sx={{ minWidth: '60%' }}
                    onChange={event => setRegistrationFormData(prev => ({ ...prev, password: event.target.value }))}></TextField>
                  <TextField variant="outlined" size="small" error={errors?.passwordConfirmation} label="Confirmation" type="password" sx={{ minWidth: '60%' }}
                    onChange={event => setRegistrationFormData(prev => ({ ...prev, passwordConfirmation: event.target.value }))}></TextField>
                  <Button variant="contained" sx={{ fontWeight: 'bold', color: 'whitesmoke' }}
                    onClick={register}
                  >
                    Inscription
                  </Button>
                  <Stack sx={{
                    flexDirection: { xs: 'column', lg: 'row' },
                    alignItems: 'center',
                    justifyContent: { lg: 'space-between' }
                  }} width='60%'>
                  </Stack>
                </Stack>
              </>}
            </Stack>
          </Paper>
        </Stack >
      </form >
    )
  }
}
