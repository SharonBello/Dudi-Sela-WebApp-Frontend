import * as React from 'react';
import { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


export const CourtPrice = () => {
  const [amount, setAmount] = useState('');
  const [value, setValue] = useState('paid');

  const handlePaidStatusChange = (event) => {
    setValue(event.target.value);
  };

  const handleAmountChange = (e) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setAmount(e.target.value);
    }
  };

  return (

    <div className="flex align-center">
      <OutlinedInput
        id="outlined-adornment-amount"
        startAdornment={<InputAdornment position="start">ש"ח</InputAdornment>}
        size='small'
        value={amount}
        onChange={(e) => handleAmountChange(e)}
        placeholder="עלות"
      />
      <RadioGroup
        aria-labelledby="controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        row
        onChange={(e) => handlePaidStatusChange(e)}
        className="flex align-center"
      >
        <FormControlLabel value="paid" control={<Radio />} label="שולם" />
        <FormControlLabel value="unpaid" control={<Radio />} label="לא שולם" />
      </RadioGroup>
    </div>
  )
}
