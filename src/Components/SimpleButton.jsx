import { Button } from '@mui/material'
import propTypes from 'prop-types'
export const SimpleButton = ({ handleClick, text }) => {
    return (
        <Button variant='contained'
            onClick={handleClick}
            sx={{
                color: 'white',
                background: (theme) => theme.palette.primary.light,
                textTransform: 'none'
            }}>{text}</Button>
    )
}
SimpleButton.propTypes = {
    handleClick: propTypes.func,
    text: propTypes.string
}