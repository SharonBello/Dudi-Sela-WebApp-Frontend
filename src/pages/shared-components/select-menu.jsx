import React from 'react';
import { useState, useEffect } from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

export const SelectMenu = ({ inputLabel = "", multiple=false, isRequired = false, placeholder = undefined, defaultValue = undefined, values, setValues }) => {

    const [value, setValue] = useState(defaultValue)
    const handleChange = (event) => {
        setValue(event.target.value);
    };
    useEffect(() => {
        setValue(defaultValue)
    }, [])
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel>{inputLabel}</InputLabel>
            <Select
                defaultValue={value}
                label={inputLabel}
                onChange={handleChange}
                multiple={multiple}>
                {values.map((val, valIdx) => (
                    <MenuItem key={valIdx} value={val}>{val}
                    </MenuItem>
                ))}

            </Select>
        </FormControl>
    );
}