import React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export const SelectMenu = ({ label, isRequired, placeholder, defaultValue, values, value, setValue }) => {

    return (
        <FormControl required sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="label">{label}</InputLabel>
            <Select
                labelId="label"
                value={value}
                label={label}
                onChange={setValue}
                placeholder={placeholder}
                defaultValue={defaultValue}
                isRequired
            >
                {values.map((value, valueIdx) => (
                    <MenuItem key={valueIdx}>{value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}