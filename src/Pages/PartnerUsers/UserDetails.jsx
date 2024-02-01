import { Divider, Grid, ListItemIcon, Menu, MenuItem, Paper, Stack, Typography, } from "@mui/material"
import { useNavigate, useParams } from 'react-router-dom'
import { AddButton } from "../../Components/AddButton"
import { AddRoleDialog } from "./AddRoleDialog"
import { ActionableTag } from "../../Components/ActionableTag"
import { Delete, MoreVert } from "@mui/icons-material"
import { SimpleButton } from "../../Components/SimpleButton"
import { RemoveRoleDialog } from "./RemoveRoleDialog"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addRoleToUser, getActiveRoleAssignmentsForUser, getAllRoles, getAllUsers, removeRoleFromUser } from "../../Api"
import { useState } from "react"
export const UserDetails = () => {
    const [isAddRoleDialogOpen, setIsAddRoleDialogOpen] = useState(false)
    const [isRemoveRoleDialogOpen, setIsRemoveRoleDialogOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [roleOptionsMenuOpen, setRoleOptionsMenuOpen] = useState(false)
    const [roleToDelete, setRoleToDelete] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const BASE_QUERY_KEY = ['activeRoleAssignments', id]

    const { data: users } = useQuery({ queryKey: ['users'], queryFn: getAllUsers })
    const { data: roleAssignments } = useQuery({ queryKey: BASE_QUERY_KEY, queryFn: () => getActiveRoleAssignmentsForUser(id) })
    const { data: roles } = useQuery({ queryKey: ['roles'], queryFn: getAllRoles })
    const queryClient = useQueryClient()
    const user = users?.find(u => u.id == id)
    // console.log(user)
    // TODO: Ecrire une fonction qui va recuperer les roles affectes a l'utilisateur en tenant compte des dates de debut et de fin
    function handleMenuClose() {
        setAnchorEl(null)
        setRoleOptionsMenuOpen(false)
    }
    function openOptionsMenu(event, roleAssignMent) {

        setAnchorEl(event.currentTarget)
        setRoleToDelete(roleAssignMent)
        setRoleOptionsMenuOpen(true)
    }
    function handleAddRoleDialogClose(roleId, startDate, expiryDate) {
        setIsAddRoleDialogOpen(false)
        if (!roleId || !startDate) { return }
        addRoleToUserMutation.mutate({
            roleId, startDate, expiryDate, userId: id
        })
    }
    function handleRemoveRoleDialogClose(roleAssignMent) {
        setIsRemoveRoleDialogOpen(false)
        if (!roleAssignMent) { return }
        removeFromUserMutation.mutate(roleAssignMent)

    }
    // function removeRoleFromUser(roleId) {
    //     var roleAssignments = roleAssignments ? [...roleAssignments] : []
    //     setSampleData(prev => ({
    //         ...prev, roleAssignments: roleAssignments.filter(r => !(r.roleId == roleId && r.userId == id))
    //     }))
    // }
    const addRoleToUserMutation = useMutation({
        mutationFn: addRoleToUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: BASE_QUERY_KEY })
    })
    const removeFromUserMutation = useMutation({
        mutationFn: removeRoleFromUser,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: BASE_QUERY_KEY })
    })
    return (
        <Paper sx={{ padding: '1em' }}>
            <Stack direction='row' justifyContent='space-between' sx={{ paddingBlockEnd: '1em' }}>
                <Typography variant="h5" >Informations de l&apos;utilisateur</Typography>
                <SimpleButton text="Retour" handleClick={() => { navigate(-1) }} />
            </Stack>
            <Divider sx={{ marginBlockEnd: '1em' }} />
            <Grid container>
                <Grid item xs={12} lg={6}>
                    <Typography variant="h6">Informations Générales</Typography>
                    <Grid container>
                        <Grid item xs={12} sm={6} lg={6}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Nom
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <Typography variant="body1">
                                {user?.lastname}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Prenoms
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <Typography variant="body1">
                                {user?.firstname}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Identifiant
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <Typography variant="body1">
                                {user?.username}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                                Dernière connexion
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={6}>
                            <Typography variant="body1">
                                {user?.lastLoginDate || "-"}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider sx={{ width: '100%', marginBlock: '1em', display: { lg: 'none' } }} />
                <Grid item xs={12} lg={6}>
                    <Stack direction='row' justifyContent='space-between' >
                        <Typography variant="h6">Roles Actifs</Typography>
                        <AddButton onClick={() => setIsAddRoleDialogOpen(true)} />
                    </Stack>
                    <Stack direction='row' spacing={2} flexWrap='wrap' alignItems='flex-start' useFlexGap paddingBlock='1em'>
                        {roleAssignments?.filter(r => r.userId == user?.id).map(
                            roleAssignment => <ActionableTag key={`role=${roleAssignment.userId}-${roleAssignment.roleId}`}
                                secondaryText={roleAssignment.expiryDate && `(Jusqu'au ${new Date(roleAssignment.expiryDate).toLocaleDateString("FR-fr")})` || ""}
                                label={roles.find(r => r.id == roleAssignment.roleId)?.nom}
                                icon={<MoreVert fontSize="1em" />}
                                handleButtonClick={(event) => openOptionsMenu(event, roleAssignment)} />
                        )}
                    </Stack>
                </Grid>
            </Grid>
            <AddRoleDialog open={isAddRoleDialogOpen} roles={roles || []}
                currentlyAssignedRoles={roleAssignments?.filter(r => r.userId == id) || []} handleClose={handleAddRoleDialogClose} />
            <RemoveRoleDialog open={isRemoveRoleDialogOpen} handleClose={handleRemoveRoleDialogClose} roleAssignMent={roleToDelete} />

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={roleOptionsMenuOpen}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => {
                    handleMenuClose()

                    setIsRemoveRoleDialogOpen(true)
                }}>

                    <ListItemIcon>
                        <Delete color='warning' fontSize='small' />
                    </ListItemIcon>
                    Retirer le role
                </MenuItem>
            </Menu >
        </Paper>
    )
}
UserDetails