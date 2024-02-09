import { Avatar, Box, Stack, Typography } from '@mui/material'
import { stringAvatar } from '../utils'
import { PropTypes } from 'prop-types'
export const Message = ({ message }) => {
    return (
        <Box marginBlock={3}>
            <Stack direction='row' spacing={2} justifyContent='flex-start'>

                <Avatar {...stringAvatar(message?.userFullName)} />
                <Stack>
                    <Typography variant='body2'>{message.userFullName}</Typography>
                    <Typography variant='caption' color='text.secondary'>{new Date(message.dateCreated).toLocaleString('Fr-fr')}</Typography>
                </Stack>
            </Stack>
            <Typography ml={7} variant='body1'>{message.body}</Typography>


        </Box>
    )
}
Message.propTypes = {
    message: PropTypes.object
}