import { IconButton, Paper, Stack, Typography } from "@mui/material"
import PropTypes from "prop-types"
export const ActionableTag = ({ handleButtonClick, label, secondaryText, icon }) => {
    return (
        <Paper sx={{ maxWidth: '200px', padding: '.2em .5em' }} variant="outlined">
            <Stack direction='row'  spacing={1}>
                <Stack>
                    <Typography variant="body1">{label}</Typography>
                    <Typography variant="subtitle2">{secondaryText}</Typography>
                </Stack>
                <IconButton size="small" onClick={(event) => handleButtonClick(event)}>{icon}</IconButton>
            </Stack>

        </Paper>
    )
}
ActionableTag.propTypes = {
    handleButtonClick: PropTypes.func,
    label: PropTypes.string,
    secondaryText: PropTypes.string,
    icon: PropTypes.object
}