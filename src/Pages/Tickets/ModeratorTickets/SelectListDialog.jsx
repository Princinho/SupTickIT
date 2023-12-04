import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, } from "@mui/material"
import PropTypes from 'prop-types'
import { useState } from "react";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const entries = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];
export const SelectListDialog = ({ title, entries, keyField, labelField, handleClose,open, placeholder }) => {
    const [selectedEntries, setSelectedEntries] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        selectedEntries.includes(value) ?
            setSelectedEntries(selectedEntries.filter(value))
            :
            setSelectedEntries(prev => [...prev, value])
    };
    return (
        <Box>
            <Dialog open={open} onClose={() => handleClose()}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>

                    <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="select-multiple-dialog-label">{placeholder}</InputLabel>
                        <Select
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={selectedEntries}
                            onChange={handleChange}
                            input={<OutlinedInput label={placeholder} />}
                            renderValue={(selected) => {
                                console.log(selected)
                                console.log(entries)
                                selected.map(item => entries.find(entry => entry.id == item)?.fullName)
                            }}
                            MenuProps={MenuProps}
                        >
                            {entries.map((entry) => (
                                <MenuItem key={entry[keyField]} value={entry[keyField]}>
                                    <Checkbox checked={selectedEntries.indexOf(entry[keyField]) > -1} />
                                    <ListItemText primary={entry[labelField]} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        handleClose()
                    }}>Fermer</Button>
                    <Button color="success" onClick={() => {
                        handleClose()
                    }}>Enregistrer</Button>

                </DialogActions>
            </Dialog>
        </Box >
    )
}

SelectListDialog