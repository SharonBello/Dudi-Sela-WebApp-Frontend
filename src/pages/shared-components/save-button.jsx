import React from 'react';
import Button from '@mui/material/Button';

export const SaveButton = ({ label = "שמור", onSave }) => {
  return (
    <Button variant="contained" component="label" onClick={onSave} className="component-save-btn">
      {label}
    </Button>
  );
}