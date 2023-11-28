import { Avatar, Box, Button, Stack, TextField, Typography } from '@mui/material'
import { stringAvatar } from '../utils'
import { PropTypes } from 'prop-types'
import { Send } from '@mui/icons-material'
export const Message = ({ message }) => {
    console.log(message)
    return (
        <Box>
            <Stack direction='row' mb={1} spacing={2} justifyContent='flex-start'>

                <Avatar {...stringAvatar(message?.userFullName)} />
                <Stack>
                    <Typography variant='body1'>{message.userFullName}</Typography>
                    <Typography variant='body2' color='text.secondary'>{new Date(message.date).toLocaleString('Fr-fr')}</Typography>
                </Stack>
            </Stack>
            <Typography ml={7} variant='body1'>{message.body}</Typography>
            

        </Box>
    )
}
Message.propTypes = {
    message: PropTypes.object
}