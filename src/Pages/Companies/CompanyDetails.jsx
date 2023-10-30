import { Paper, Typography, Stack, Grid, IconButton, MenuItem, ListItemIcon, Menu } from "@mui/material"
import { useNavigate, useParams } from 'react-router-dom'
import DataTable from "react-data-table-component";
import { Delete, MoreVert } from "@mui/icons-material";
import { useContext, useState } from "react";
import { AddButton } from "../../Components/AddButton";
import { RemoveProject } from "./RemoveProject";
import { SimpleButton } from "../../Components/SimpleButton";
import { DataContext } from "../../Contexts";
import { AddCompanyToProjectDialog } from "./AddCompanyToProjectDialog";
export const CompanyDetails = () => {
    const [focusedProject, setFocusedProject] = useState(null)
    const { sampleData, setSampleData } = useContext(DataContext)

    const [anchorEl, setAnchorEl] = useState(null)
    const [isRemoveProjectMenuOpen, setIsRemoveProjectMenuOpen] = useState(false)
    const [isAddProjectDialogOpen, setIsAddProjectDialogOpen] = useState(false)
    // console.log(isBigScreen)
    const { id } = useParams()
    const company = sampleData.companies.find(app => app.id == id);
    const companyProjects = company.projects?.map(projId => sampleData.projects.find(p => p.id == projId))
    const navigate = useNavigate()
    function handleMenuClose() {
        setAnchorEl(null)
    }
    function closeRemoveDialog(project) {
        // console.log(project)
        if (project) {
            // TODO: Code pour retirer le projet a l'entreprise
            let newSampleData = {
                ...sampleData, companies: [...sampleData.companies.map(
                    comp => comp.id == company.id ?
                        { ...comp, projects: [...comp.projects.filter(projId => projId != project.id)] } : comp
                )]
            }
            setSampleData(newSampleData)
            console.log(newSampleData)
        }
        setFocusedProject(null)
        setIsRemoveProjectMenuOpen(false)
    }
    function addProject(company, projectId) {
        console.log(company)
        console.log(projectId)
        if (company && projectId) {
            // TODO: Code pour retirer le projet a l'entreprise
            let newSampleData = {
                ...sampleData, companies: [...sampleData.companies.map(
                    comp => comp.id == company.id ?
                        { ...comp, projects: [...comp.projects, projectId] } : comp
                )]
            }
            setSampleData(newSampleData)
            console.log(newSampleData)
        }
        setIsAddProjectDialogOpen(false)
    }

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
                        <DataTable columns={projectColumns} data={companyProjects} responsive={false} />
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
            <AddCompanyToProjectDialog
                entry={company}
                handleClose={addProject}
                open={isAddProjectDialogOpen} />
        </>

    )
}
