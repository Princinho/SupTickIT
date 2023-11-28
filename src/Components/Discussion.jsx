import { Box, Button, Stack, TextField } from '@mui/material'
import { Message } from './Message'
import { Send } from '@mui/icons-material'
import PropTypes from 'prop-types'
import { useState } from 'react'
export const Discussion = ({ messages, addMessage }) => {
    const [message, setMessage] = useState('')
    return (
        <Box>
            {messages?.map(m => <Message key={m.id} message={m} />)}
            <Stack direction='row' mt={2}>
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
                        },
                    }}
                    maxRows={4}
                />
                <Button variant='contained' disableElevation
                    onClick={() => addMessage(message)}
                    sx={{
                        borderRadius: 0,
                        borderTopRightRadius: '4px',
                        borderBottomRightRadius: '4px',
                        backgroundColor: (theme) => theme.palette.primary.light,
                        color: 'white', marginRight: '1em'
                    }}><Send /></Button>
            </Stack>
        </Box>
    )
}
Discussion.propTypes = {
    messages: PropTypes.array.isRequired,
    addMessage: PropTypes.func.isRequired,
}