import React, { useEffect, useRef } from 'react';
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
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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
      inputRef={inputRef}
    />
  );
};

export default Input;
