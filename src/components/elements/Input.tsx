import React from 'react';
import { Input as MuiInput } from '@mui/material';
import { InputPropsType } from '@/@types/elements';


const Input: React.FC<InputPropsType> = ({
  name,
  onChange,
  placeholder,
  type,
  value,
  sx,
}) => {
  return (
    <MuiInput
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
      fullWidth={true}
      sx={sx}
      disableUnderline={true}
      autoFocus={true}
    />
  );
};

export default Input;
