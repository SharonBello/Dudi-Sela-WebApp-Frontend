import React from 'react';
import { useState } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export const SelectMenu = ({ inputLabel = "", isRequired = false, placeholder = "", defaultValue = "", values, setValues }) => {

    const [value, setValue] = useState()
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>{inputLabel}</InputLabel>
            <Select
                value={value}
                label={inputLabel}
                onChange={handleChange}
            >
                {values.map((val, valIdx) => (
                    <MenuItem key={valIdx} value={val}>{val}
                    </MenuItem>
                ))}

            </Select>
        </FormControl>
    );
}