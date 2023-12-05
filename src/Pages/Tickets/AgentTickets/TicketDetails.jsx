
import { Box, Button, Chip, Divider, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material'

import { useContext, useState } from 'react'
import { createMessage, editTicket, getAllUsers, getCategory, getProject, getTicket, getTicketMessages, isUserInRole } from '../../../Api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UserContext } from '../../../Contexts'
import { useNavigate, useParams } from 'react-router-dom'
import { timeSince } from '../../Companies/utils'
import { SimpleButton } from '../../../Components/SimpleButton'
import { Discussion } from '../../../Components/Discussion'
import { SYSTEM_ROLES, TICKET_STATUS } from '../../../utils'
import { TicketStatus } from '../../../Components/TicketStatus'
import { SimpleDialog } from '../../../Components/SimpleDialog'

export const TicketDetails = () => {
    const { id } = useParams()
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const BASE_QUERY_KEY = 'tickets'
    const queryClient = useQueryClient()
    const { data: ticket } = useQuery({ queryKey: [BASE_QUERY_KEY, id], queryFn: () => getTicket(id) })
    const { data: messages } = useQuery({ queryKey: ['messages', `ticket${id}`], queryFn: () => getTicketMessages(id) })
    const { data: users } = useQuery({ queryKey: ['users'], queryFn: getAllUsers })
    const { data: project } = useQuery({ queryKey: ['projects', ticket?.projectId], queryFn: () => getProject(ticket?.projectId) })
    const { data: category } = useQuery({ queryKey: ['categories', ticket?.categoryId], queryFn: () => getCategory(id) })
    const author = users?.find(u => u.id == ticket?.createdBy)
    const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
    const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
    const createMutation = useMutation({
        mutationFn: createMessage,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['messages', `ticket${id}`] })
    })
    const editMutation = useMutation({
        mutationFn: editTicket,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [BASE_QUERY_KEY, id] })
    })
    function rejectTicket(reject) {
        if (reject) {
            console.warn('Ticket has been rejected')
            editMutation.mutate({ ...ticket, status: TICKET_STATUS.REJECTED })
        }
        setIsRejectDialogOpen(false)
    }
    function confirmTicket(confirm) {
        if (confirm) {
            console.info('Ticket has been confirmed')
            editMutation.mutate({ ...ticket, status: TICKET_STATUS.APPROVED })
        }
        setIsConfirmDialogOpen(false)
    }
    function addMessage(body) {
        let message = {
            ticketId: id,
            body: body, date: new Date().toISOString(),
            userId: user?.id,
            userFullName: user?.firstName + ' ' + user?.lastName
        }
        createMutation.mutate(message)
    }
    function changeTicketStatus(status) {
        editMutation.mutate({ ...ticket, status })
    }
    return (
        <Paper sx={{ padding: '1em', flexGrow: 1 }} elevation={2}>
            <Typography variant='h6' component='span' sx={{ fontWeight: 'bold' }}>Détails du ticket </Typography>
            <Stack direction='row' justifyContent='space-between' >
                <Stack direction='row' mb={2}>
                    <Typography color='text.secondary' sx={{ fontWeight: 'bold' }}>Menu /</Typography>
                    <Typography color='primary.light' sx={{ fontWeight: 'bold' }}>Tickets</Typography>
                </Stack>
                <SimpleButton text="Retour" handleClick={() => { navigate(-1) }} />
            </Stack>
            <Box sx={{ maxHeight: '30vh', overflowY: 'scroll' }}>
                <Typography variant='subtitle1'>#{id}</Typography>
                <Stack direction='row' alignItems='center' spacing={1}>
                    <Typography variant='h5' component='h2' fontWeight='bold'>{ticket?.name}</Typography>
                    <Stack direction='row'>
                        <Chip size="small" label={project?.title} sx={{ fontWeight: 'bold', backgroundColor: (theme) => theme.palette.primary.light, color: 'white' }} color="default" />
                        {category && <>
                            /<Chip size="small" label={category?.name} color="primary" variant='outlined' />
                        </>}
                    </Stack>
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
                        <Typography variant='subtitle2' fontWeight='bold'>{author?.firstName + " " + author?.lastName}</Typography>
                    </Stack>
                </Stack>
                <Typography variant='body1' mb={2}>
                    {ticket?.description}
                </Typography>
                <Typography variant='body1' color='text.secondary' mb={2}> Pièces jointes</Typography>
                <Divider sx={{ marginBlock: '1em' }} />
                <Stack justifyContent='space-between' direction='row'>
                    <Typography variant='body1' fontWeight='bold' mb={2}> Etat</Typography>
                    {isUserInRole(SYSTEM_ROLES.AGENT, user?.id) ?
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
                                <Button color='success' onClick={() => setIsConfirmDialogOpen(true)} variant='contained' size='small'>Approuver</Button>
                                <Button color='error' onClick={() => setIsRejectDialogOpen(true)} variant='contained' size='small'>Rejeter</Button>
                            </Stack>}
                        </Stack>
                    }

                </Stack>
            </Box>
            <Box sx={{ position: 'relative' }}>
                <Box sx={{ maxHeight: '50vh', overflowY: 'scroll' }}>
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
                dialogContent={<Typography variant="body1">Rejeter le ticket?</Typography>}
                dialogTitle='Confirmation' confirmationButtonColor='error'
                approveText='Oui'
            />
        </Paper >
    )
}
