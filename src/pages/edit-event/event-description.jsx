import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";

export const EventDescription = () => {
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off">
            <TextField id="event-description" label="תיאור האירוע" variant="outlined" sx={{ marginBlock: "unset !importsnt"}} />
        </Box>
    )
}
