import React from 'react';
import Button from '@mui/material/Button';

export const SaveButton = ({ label = "שמור", onSave, disabled=false }) => {
  return (
    <Button disabled={disabled} variant="contained" component="label" onClick={(e) => onSave(e)} className="component-save-btn">
      {label}
    </Button>
  );
}