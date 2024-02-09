import { Paper, Typography, Stack, Grid, IconButton, MenuItem, ListItemIcon, Menu, Box } from "@mui/material"
import { useNavigate, useParams } from 'react-router-dom'
import DataTable from "react-data-table-component";
import { Delete, MoreVert } from "@mui/icons-material";
import { useState } from "react";
import { AddButton } from "../../Components/AddButton";
import { RemoveProject } from "./RemoveProject";
import { SimpleButton } from "../../Components/SimpleButton";
import { AddCompanyToProjectDialog } from "./AddCompanyToProjectDialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assignProject, getAllCompaniesAsync, getAllProjectsAsync, unAssignProject } from "../../Api";
export const CompanyDetails = () => {
    const [focusedProject, setFocusedProject] = useState(null)

    const [anchorEl, setAnchorEl] = useState(null)
    const [isRemoveProjectMenuOpen, setIsRemoveProjectMenuOpen] = useState(false)
    const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false)
    // console.log(isBigScreen)
    const { id } = useParams()
    const BASE_QUERY_KEY = 'companies'
    const queryClient = useQueryClient()
    const { isLoading, data: companies } = useQuery({ queryKey: [BASE_QUERY_KEY], queryFn: getAllCompaniesAsync })
    const { data: projects } = useQuery({ queryKey: ['projects'], queryFn: getAllProjectsAsync })
    const company = companies?.find(comp => comp?.id == id);
    // const companyProjects = 
    const navigate = useNavigate()
    function handleMenuClose() {
        setAnchorEl(null)
    }
    const assignProjectMutation = useMutation({
        mutationFn: assignProject,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
    })
    const unassignProjectMutation = useMutation({
        mutationFn: unAssignProject,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY] })
    })
    function closeRemoveDialog(project) {
        // console.log(project)
        if (project) {
            // TODO: Code pour retirer le projet a l'entreprise
            unassignProjectMutation.mutate({
                projectId: project.id, companyId:id
            })
        }
        setFocusedProject(null)
        setIsRemoveProjectMenuOpen(false)
    }
    function addProject(projectId) {
        if (company && projectId) {

            assignProjectMutation.mutate({
                projectId, companyId: id
            })
        }
        setIsAddProjectDialogOpen(false)
    }
    console.log("Company", company)
    const projectColumns = [
        {
            name: 'Nom', selector: row => <Typography variant="body1">{row.title}</Typography>,
            maxWidth: '200px'
        },
        {
            name: 'Description', cell: row => <Typography variant="body1" sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                "WebkitLineClamp": '1',
                "WebkitBoxOrient": "vertical"
            }} >{row.description}</Typography>,
        },
        {
            name: 'Options', cell: row => <IconButton onClick={event => {
                // console.log(row)
                setFocusedProject(row)
                setAnchorEl(event.currentTarget)
            }}

            ><MoreVert /></IconButton>,
            maxWidth: '64px'
        },
    ]
    if (isLoading) return <Box sx={{ minHeight: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>Loading...</Box>
    return (
        <>
            <Paper sx={{ padding: '1em', paddingRight: 0, flexGrow: 1 }} elevation={2}>
                <Typography variant='h5' component='span' sx={{ fontWeight: 'bold' }}>{company.name}</Typography>
                <Stack direction='row' justifyContent='space-between' sx={{ paddingInlineEnd: '1em' }}>
                    <Stack direction='row'>
                        <Typography color='text.secondary' sx={{ fontWeight: 'bold' }}>Menu /</Typography>
                        <Typography color='text.secondary' sx={{ fontWeight: 'bold' }}>Entreprises/</Typography>
                        <Typography color='primary.light' sx={{ fontWeight: 'bold' }}>{company.name}</Typography>
                    </Stack>

                    <SimpleButton text="Retour" handleClick={() => { navigate(-1) }} />
                </Stack>
            </Paper>
            <Grid container mt={0} spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper sx={{ padding: '1em' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Description</Typography>
                        <Typography variant="body1">{company.description}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ padding: '1em' }}>
                        <Stack direction='row' justifyContent='space-between' mb={1}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Projets en cours</Typography>
                            <AddButton onClick={() => setIsAddProjectDialogOpen(true)} />
                        </Stack>
                        {projects && companies && <DataTable columns={projectColumns}
                            data={company.projects?.map(proj => projects?.find(p => p?.id == proj.id)) || []}
                            responsive={false} />}
                    </Paper>
                </Grid>
            </Grid>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={Boolean(anchorEl)}
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
                    // closing the menu
                    handleMenuClose()
                    setIsRemoveProjectMenuOpen(true)
                    // showRemoveProjectDialog(focusedEntry)
                }}>
                    <ListItemIcon>
                        <Delete color='error' fontSize="small" />
                    </ListItemIcon>
                    Retirer
                </MenuItem>
            </Menu >
            {focusedProject && <RemoveProject project={focusedProject}
                handleClose={closeRemoveDialog}
                open={isRemoveProjectMenuOpen} />}
            {company && <AddCompanyToProjectDialog
                projects={projects}
                entry={company}
                handleClose={addProject}
                open={isAddProjectDialogOpen} />}
        </>

    )
}
