import { useTheme } from '@emotion/react'
import { Dot } from './Dot'
import { TICKET_PRIORITY } from '../utils'
import PropTypes from 'prop-types'

export const PriorityDot = ({ type }) => {
    let theme = useTheme()


    let color = theme.palette.primary
    switch (type) {
        case TICKET_PRIORITY.NORMAL:
            color = theme.palette.primary.light
            return <Dot color={color} />
        case TICKET_PRIORITY.HIGH:
            color = theme.palette.warning.main
            return <Dot color={color} />
        case TICKET_PRIORITY.CRITICAL:
            color = theme.palette.error.main
            return <Dot color={color} />
    }
}
PriorityDot.propTypes = {
    type: PropTypes.number
}