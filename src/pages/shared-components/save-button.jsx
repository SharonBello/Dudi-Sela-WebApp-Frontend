import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';

export const SaveButton = ({label="שמור", onSave}) => {
  return (
    <Button variant="contained" component="label" onClick={onSave}>
    {label}
    </Button>
  );
}