import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const TextBox = ({ label, disabled=false, isRequired=false, type="text", placeholder="", defaultValue="", value="", setValue, boxSx={'& > :not(style)': { m: 2, width: '50ch' }} }) => {

    return (
        <Box sx={boxSx} autoComplete="off">
            <TextField
                id="outlined-basic"
                label={label}
                isRequired={isRequired}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                variant="outlined"
                onChange={(e) => setValue(e.currentTarget.value)}
                value={value}
                disabled={disabled}
            />
        </Box>
    );
}