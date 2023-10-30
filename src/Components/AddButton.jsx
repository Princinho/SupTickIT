import { Button } from '@mui/material'
import propTypes from 'prop-types'
export const AddButton = (props) => {
    return (
        <Button variant='contained'
            {...props}
            sx={{
                color: 'white',
                background: (theme) => theme.palette.primary.light,
                textTransform: 'none'
            }}>Ajouter</Button>
    )
}
AddButton.propTypes = { handleClick: propTypes.func }