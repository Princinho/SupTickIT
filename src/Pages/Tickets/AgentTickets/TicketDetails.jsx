
import { Box, Button, Chip, Divider, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material'

import { useCallback, useContext, useEffect, useState } from 'react'
import { API_BASE, SERVER_BASE, createMessageAsync, deleteAttachmentAsync, editTicket, getAllCategories, getAllProjectsAsync, getAllUsersAsync, getTicket, getTicketAttachmentsAsync, getTicketLogsByTicketId, getTicketMessagesAsync, isUserInRole } from '../../../Api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UserContext } from '../../../Contexts'
import { useNavigate, useParams } from 'react-router-dom'
import { timeSince } from '../../Companies/utils'
import { SimpleButton } from '../../../Components/SimpleButton'
import { Discussion } from '../../../Components/Discussion'
import { SYSTEM_ROLES, TICKET_STATUS } from '../../../utils'
import { TicketStatus } from '../../../Components/TicketStatus'
import { SimpleDialog } from '../../../Components/SimpleDialog'
import ImagePreviewInput from '../../../Components/ImagePreviewInput'
import { Add, History } from '@mui/icons-material'
import { useTheme } from '@emotion/react'
import { TicketHistoryDialog } from './TicketHistoryDialog'
import { BarLoader } from 'react-spinners'
import axios from 'axios'
import ImagePreview from '../../../Components/ImagePreview'

export const TicketDetails = () => {
    const { id } = useParams()
    const { user } = useContext(UserContext)
    const theme = useTheme()
    const primaryLight = theme?.palette.primary.light
    const navigate = useNavigate()
    const BASE_QUERY_KEY = 'tickets'
    const queryClient = useQueryClient()
    const TICKET_MESSAGES_KEY = ['messages', `ticket${id}`]
    const { data: ticket } = useQuery({ queryKey: [BASE_QUERY_KEY, id], queryFn: () => getTicket(id) })
    const { data: messages, refetch: refetchMessages } = useQuery({ queryKey: TICKET_MESSAGES_KEY, queryFn: () => getTicketMessagesAsync(id) })
    const { data: ticketLogs } = useQuery({ queryKey: ['ticketLogs', `ticket${id}`], queryFn: () => getTicketLogsByTicketId(id) })
    const { data: attachments, refetch: refetchAttachments } = useQuery({ queryKey: ['attachments', `ticket${id}`], queryFn: () => getTicketAttachmentsAsync(id) })
    const { data: users } = useQuery({ queryKey: ['users'], queryFn: getAllUsersAsync })
    const { data: projects, isLoading } = useQuery({ queryKey: ["projects"], queryFn: getAllProjectsAsync })
    const { data: categories } = useQuery({ queryKey: ['categories'], queryFn: getAllCategories })

    const author = users?.find(u => u.id == ticket?.createdBy)
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
    const [isCloseTicketDialogOpen, setIsCloseTicketDialogOpen] = useState(false)
    const [isConfirmDeleteAttachmentDialogOpen, setIsConfirmDeleteAttachmentDialogOpen] = useState(false)
    const [attachmentToDelete, setAttachmentToDelete] = useState()
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
    const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false)
    const [attachmentFile, setAttachmentFile] = useState(null);
    const createMutation = useMutation({
        mutationFn: createMessageAsync,
        onSuccess: () => refetchMessages(),
        onSettled: refetchMessages
    })
    const editMutation = useMutation({
        mutationFn: editTicket,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY, id] })
    })
    const deleteAttachmentMutation = useMutation({
        mutationFn: deleteAttachmentAsync,
        onSuccess: () => {
            refetchAttachments()
            queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY, id] })
        }
    })
    function closeHistoryDialog() {
        setIsHistoryDialogOpen(false)
    }
    function rejectTicket(proceed) {
        if (proceed) {
            console.warn('Ticket has been rejected')
            editMutation.mutate({ ...ticket, status: TICKET_STATUS.REJECTED })
        }
        setIsRejectDialogOpen(false)
    }
    function closeTicket(proceed) {
        if (proceed) {
            console.warn('Ticket has been rejected')
            editMutation.mutate({ ...ticket, status: TICKET_STATUS.CLOSED })
        }
        setIsCloseTicketDialogOpen(false)
    }
    function closeDeleteAttachmentDialog(confirmDelete) {
        console.log(confirmDelete)
        if (confirmDelete) {
            deleteAttachmentMutation.mutate(attachmentToDelete)
        }
        setIsConfirmDeleteAttachmentDialogOpen(false)
    }
    function confirmTicket(proceed) {
        if (proceed) {
            console.info('Ticket has been confirmed')
            editMutation.mutate({ ...ticket, status: TICKET_STATUS.APPROVED })
        }
        setIsConfirmDialogOpen(false)
    }
    function addMessage(body) {
        let message = {
            ticketId: id,
            body: body,
            userId: user?.id,
        }
        createMutation.mutate(message)
    }
    function changeTicketStatus(status) {
        editMutation.mutate({ ...ticket, status })
    }
    const handleFileChange = (e) => {
        if (e.target.files) {
            setAttachmentFile(e.target.files[0]);
        }
    };
    const uploadAttachmentFile = useCallback(async () => {
        if (attachmentFile) {
            console.log("Uploading file...");
            const formData = new FormData();
            formData.append("file", attachmentFile);
            try {
                // You can write the URL of your server or any other endpoint used for file upload
                const result = await axios.post(`${API_BASE}attachments/uploadfile/${id}`, formData);
                const data = await result.data;
                console.log(data);
                refetchAttachments()
            } catch (error) {
                console.error(error);
            }
        }
        setAttachmentFile(null)
    }, [attachmentFile, refetchAttachments, id]);
    useEffect(() => {
        if (attachmentFile) uploadAttachmentFile()
    }, [attachmentFile, uploadAttachmentFile])
    if (!user?.RoleAssignments) return <h1>Vous n&apos;etes pas autorisés</h1>

    let userRoles = users?.find(u => u.id == user.id).roles
    let projectCategory = categories?.find(c => c.id == ticket?.categoryId)

    let project = Array.from(projects).find(p => p.id == projectCategory?.projectId)
    let projectLabel = project?.title
    if (isLoading) return <BarLoader width={'200px'} color='#e3c48f' />
    return (
        <Paper sx={{ padding: '1em', flexGrow: 1 }} elevation={2}>

            <Typography variant='h6' component='span' sx={{ fontWeight: 'bold' }}>Détails du ticket </Typography>
            <Stack direction='row' justifyContent='space-between' paddingRight={2}>
                <Stack direction='row' mb={2}>
                    <Typography color='text.secondary' sx={{ fontWeight: 'bold' }}>Menu /</Typography>
                    <Typography color='primary.light' sx={{ fontWeight: 'bold' }}>Tickets</Typography>
                </Stack>
                <SimpleButton text="Retour" handleClick={() => { navigate(-1) }} />
            </Stack>
            <Box sx={{ maxHeight: '50vh', overflowY: 'scroll' }}>
                <Typography variant='subtitle1'>#{id}</Typography>
                <Stack direction='row' alignItems='center' spacing={1}>
                    <Typography variant='h5' component='h2' fontWeight='bold'>{ticket?.name}</Typography>

                    {isLoading ? <BarLoader color='#efd23a' width={'200px'} /> : <Stack direction='row'>
                        <Chip size="small" label={projectLabel}
                            sx={{
                                fontWeight: 'bold',
                                backgroundColor: (theme) => theme.palette.primary.light, color: 'white'
                            }} color="default" />
                        {categories && <>
                            <Typography variant='span' fontWeight='bold' mx={'2px'}> / </Typography>
                            <Chip size="small" label={projectCategory?.title} color="primary" variant='outlined' />
                        </>}
                    </Stack>}
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent='flex-start' gap='.2em' mb={2}>
                    <Stack direction="row" gap='.2em'>
                        <Typography variant='subtitle2'>Soumis le: </Typography>
                        <Typography variant='subtitle2' fontWeight='bold'>{new Date(ticket?.dateCreated).toLocaleDateString('Fr-fr')}</Typography>
                    </Stack>
                    <Stack direction="row" gap='.2em'>
                        <Typography variant='subtitle2'>Dernière modification: </Typography>
                        <Typography variant='subtitle2' fontWeight='bold'> Il y a {timeSince(new Date(ticket?.dateCreated))}</Typography>
                    </Stack>
                    <Stack direction="row" gap='.2em'>
                        <Typography variant='subtitle2'>Auteur: </Typography>
                        <Typography variant='subtitle2' fontWeight='bold'>{author?.firstname + " " + author?.lastname}</Typography>
                    </Stack>
                </Stack>
                <Typography variant='body1' mb={2}>
                    {ticket?.description}
                </Typography>
                <Divider sx={{ marginBlock: '1em' }} />
                <Stack justifyContent='space-between' direction='row'>
                    <Typography variant='body1' fontWeight='bold' mb={2}> Etat</Typography>
                    <Stack direction='row' alignItems='center'>
                        {userRoles?.some(r => r == SYSTEM_ROLES.AGENT) ?
                            <FormControl sx={{ minWidth: '15%' }} size='small'>
                                <InputLabel id="status-select-label">Etat</InputLabel>
                                <Select
                                    labelId="status-select-label"
                                    id="status-label"
                                    label="Etat"
                                    value={ticket?.status}
                                    onChange={event => changeTicketStatus(event.target.value)}
                                >
                                    <MenuItem value={TICKET_STATUS.PROCESSING}>
                                        <TicketStatus status={TICKET_STATUS.PROCESSING} />
                                    </MenuItem>
                                    <MenuItem value={TICKET_STATUS.AWAITING_RESPONSE}>
                                        <TicketStatus status={TICKET_STATUS.AWAITING_RESPONSE} />
                                    </MenuItem>
                                    <MenuItem value={TICKET_STATUS.PROCESSED}>
                                        <TicketStatus status={TICKET_STATUS.PROCESSED} />
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            :
                            <Stack gap={1}>
                                <TicketStatus status={ticket?.status} />
                                {ticket?.status == TICKET_STATUS.PROCESSED && <Stack direction='row' gap={1}>
                                    <Button color='success' onClick={() => setIsConfirmDialogOpen(true)} variant='contained' size='small'>Satisfait</Button>
                                    <Button color='error' onClick={() => setIsRejectDialogOpen(true)} variant='contained' size='small'>Non satisfait</Button>
                                </Stack>}

                                {ticket?.status == TICKET_STATUS.APPROVED && isUserInRole(SYSTEM_ROLES.MODERATOR, user?.id) && <Stack direction='row' gap={1}>
                                    <Button color='success' onClick={() => setIsCloseTicketDialogOpen(true)} variant='contained' size='small'>Cloturer</Button>
                                </Stack>}
                            </Stack>
                        }
                        <Button variant='outlined' color='primary' sx={{ marginLeft: 1 }}
                            onClick={() => setIsHistoryDialogOpen(true)}>
                            <History sx={{ color: primaryLight }} />
                        </Button>
                    </Stack>


                </Stack>
                <Typography variant='body1' color='text.secondary' mb={2}> Pièces jointes</Typography>
                {/* <ImagePreviewInput /> */}
                <Stack direction="row" alignItems='center' gap={3}>
                    {attachments?.map(a => {
                        const imageUrl = SERVER_BASE + a.filePath
                        return <ImagePreview src={imageUrl} fileName={a.fileName} key={a.filePath}
                            removeCallback={() => {
                                console.log('removing')
                                setAttachmentToDelete(a)
                                setIsConfirmDeleteAttachmentDialogOpen(true)
                            }}
                        />
                    })}
                    <Box>
                        <div>
                            <Button variant='contained' size='large' sx={{ height: '200px', width: '150px',padding:'0' }}>
                                <label htmlFor="file" className="sr-only" style={{
                                    display: 'flex', justifyContent: 'center',
                                    width:'100%',height:'100%',
                                    alignItems: 'center', borderRadius: '.5em',cursor:'pointer'
                                }}><Add />
                                    <input id="file" style={{ display: 'none' }} type="file" onChange={handleFileChange} />
                                </label>
                            </Button>
                        </div>
                    </Box>
                </Stack>
            </Box>
            <Box sx={{ position: 'relative' }}>
                <Box sx={{ maxHeight: '40vh', overflowY: 'scroll' }}>
                    <Typography variant='body1' fontWeight='bold' mb={1}> Messages</Typography>
                    <Discussion messages={messages || []} addMessage={addMessage} users={users} />
                </Box>
            </Box>
            <SimpleDialog open={isConfirmDialogOpen} handleClose={confirmTicket}
                dialogContent={<Typography variant="body1">Approuver le ticket?</Typography>}
                dialogTitle='Confirmation' confirmationButtonColor='success'
                approveText='Oui'
            />
            <SimpleDialog open={isRejectDialogOpen} handleClose={rejectTicket}
                dialogContent={<Typography variant="body1">Non satisfait du ticket?</Typography>}
                dialogTitle='Confirmation' confirmationButtonColor='error'
                approveText='Oui'
            />
            <SimpleDialog open={isCloseTicketDialogOpen} handleClose={closeTicket}
                dialogContent={<Typography variant="body1">Cloturer le ticket?</Typography>}
                dialogTitle='Confirmation de cloture' confirmationButtonColor='error'
                approveText='Oui'
            />
            {attachmentToDelete && <SimpleDialog open={isConfirmDeleteAttachmentDialogOpen} handleClose={closeDeleteAttachmentDialog}
                dialogContent={<Stack>
                    <Typography variant="body1" mb={2}>Supprimer la piece jointe?</Typography>
                    <ImagePreview src={SERVER_BASE + attachmentToDelete?.filePath} fileName={attachmentToDelete?.fileName} key={attachmentToDelete?.filePath}
                    />
                </Stack>}
                dialogTitle='Confirmation de cloture' confirmationButtonColor='error'
                approveText='Oui'
            />}
            <TicketHistoryDialog open={isHistoryDialogOpen} handleClose={closeHistoryDialog} ticketLogs={ticketLogs} ticket={ticket} />
        </Paper >
    )
}
