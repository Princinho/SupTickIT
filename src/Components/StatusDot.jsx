import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import { Dot } from './Dot'
import { TICKET_STATUS } from '../utils'

export const StatusDot = ({ type }) => {
    let theme = useTheme()


    let color = theme.palette.primary
    switch (type) {
        case TICKET_STATUS.PENDING:
            color = theme.palette.grey[400]
            return <Dot color={color} borderColor={theme.palette.grey[600]} />
        case TICKET_STATUS.PROCESSED:
            color = theme.palette.success.light
            return <Dot color={color} borderColor={theme.palette.success.main} />
        case TICKET_STATUS.REJECTED:
            color = theme.palette.error.light
            return <Dot color={color} borderColor={theme.palette.error.main} />
    }
}
