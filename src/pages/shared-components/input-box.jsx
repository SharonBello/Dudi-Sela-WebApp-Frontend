import React from 'react';
import { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl';
import {SaveButton} from './save-button';
import TextField from '@mui/material/TextField';

export const InputBox = ({ inputLabel = "", handleSubmit }) => {
    const [value, setValue] = useState()
    const handleChange = (e) => {
        setValue(e.target.value)
    }
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField value={value} onChange={handleChange} label={inputLabel} id="outlined-basic" />
            <button onClick={(e) => handleSubmit(e, value)} className="table-actions-btn">
            שמור
            </button>
        </FormControl>
    );
}