import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export const TextBox = ({ label, isRequired=false, type="text", placeholder="", defaultValue="", value, setValue, boxSx={'& > :not(style)': { m: 1, width: '25ch' }} }) => {

    return (
        <Box component="form" sx={boxSx} autoComplete="off">
            <TextField
                id="outlined-basic"
                label={label}
                isRequired={isRequired}
                type={type}
                placeholder={placeholder}
                defaultValue={defaultValue}
                variant="outlined"
                onChange={setValue}
                value={value}
            />
        </Box>
    );
}