import { useTheme } from '@emotion/react'
import { Box } from '@mui/material'
import { Dot } from './Dot'
import { TICKET_PRIORITY } from '../utils'

export const PriorityDot = ({ type }) => {
    let theme = useTheme()


    let color = theme.palette.primary
    switch (type) {
        case TICKET_PRIORITY.NORMAL:
            color = theme.palette.primary.main
            return <Dot color={color} />
        case TICKET_PRIORITY.HIGH:
            color = theme.palette.warning.main
            return <Dot color={color} />
        case TICKET_PRIORITY.CRITICAL:
            color = theme.palette.error.main
            return <Dot color={color} />
    }
}
