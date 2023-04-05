import React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';

export const SwitchInput = ({ label, isRequired, defaultValue, value, setValue }) => {

    return (
        <FormControl component="fieldset" variant="standard">
            <FormLabel component="legend">{label}</FormLabel>
                <FormControlLabel
                    control={
                        <Switch
                            checked={false}
                            onChange={setValue}
                            name={value}
                        />
                    }
                    label={label}
                />
        </FormControl>
    );
}