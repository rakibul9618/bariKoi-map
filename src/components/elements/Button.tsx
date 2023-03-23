import { ButtonPropsType } from '@/@types/elements';
import { Button as MuiButton } from '@mui/material';
import React from 'react';

const Button: React.FC<ButtonPropsType> = ({ children, sx, onClick }) => {
  return (
    <MuiButton
      variant="text"
      sx={{ minWidth: '0px', borderRadius: '5px', color: 'white', ...sx }}
      onClick={onClick}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
