import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import PropTypes from 'prop-types'
export const DropdownSelector = ({ options, handleChange, label, keyField = 'id', labelField = 'name', defaultValue, disabled = false, size = "medium" }) => {
    const [selectedValue, setSelectedValue] = useState(defaultValue)
    return (
        <FormControl fullWidth sx={{ marginTop: '1em' }}
                size={size}>
            <InputLabel id="select-label">{label}</InputLabel>
            <Select
                labelId="select-label"
                disabled={disabled}
                id="select"
                value={selectedValue}
                label={label}
                onChange={({ target: { value } }) => {
                    setSelectedValue(value)
                    handleChange(value)
                }}
            >
                {options?.map(
                    entry => <MenuItem key={`projet-${entry[keyField]}`} value={entry[keyField]}>{entry[labelField]}</MenuItem>
                )}

            </Select>
        </FormControl>
    )
}
DropdownSelector.propTypes = {
    options: PropTypes.array,
    handleChange: PropTypes.func,
    label: PropTypes.string.isRequired,
    keyField: PropTypes.string,
    labelField: PropTypes.string,
    size: PropTypes.string,
    defaultValue: PropTypes.string,
    disabled: PropTypes.bool
}