import { Box, Button, Stack, TextField } from '@mui/material'
import { Message } from './Message'
import { Send } from '@mui/icons-material'
import PropTypes from 'prop-types'
import { useState } from 'react'
export const Discussion = ({ messages, addMessage, users }) => {
    const [message, setMessage] = useState('')


    return (
        <>
            <Box paddingBottom={6}>
                {messages.sort((a, b) => (new Date(a.date) - new Date(b.date)))
                    .map(m => <Message key={m.id} message={({ ...m, userFullName: getUserFullName(m.userId, users) })} />)}
            </Box>
            <Stack direction='row' mt={2} alignItems='flex-start' sx={{ position: 'absolute', bottom: 0, right: '1em', left: 0 }}>
                <TextField ml={7}
                    id="outlined-multiline-flexible"
                    label="Ecrivez un message" fullWidth
                    multiline size='small'
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 0,
                            height: '3rem'
                        },backgroundColor:'white'
                    }}
                    maxRows={2}
                />
                <Button variant='contained' disableElevation
                    onClick={() => {
                        addMessage(message)
                        setMessage('')
                    }}
                    sx={{
                        borderRadius: 0,
                        borderTopRightRadius: '4px',
                        borderBottomRightRadius: '4px',
                        backgroundColor: (theme) => theme.palette.primary.light,
                        color: 'white',
                        minHeight: '3rem'
                    }}><Send /></Button>
            </Stack>
        </>
    )
}
function getUserFullName(userId, users) {
    if (!users) return ""
    let targetUser = users.find(u => u.id == userId)
    if (targetUser) return targetUser.firstname + " " + targetUser.lastname
    return "N/A"
}
Discussion.propTypes = {
    messages: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    addMessage: PropTypes.func.isRequired,
}