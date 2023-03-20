import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";

export const EventTitle = () => {
    return (
        <Box
            component="form"
            noValidate
            autoComplete="off">
            <TextField id="event-title" label="כותרת האירוע" variant="outlined" sx={{ marginBlock: "unset !importsnt"}} />
        </Box>
    )
}
