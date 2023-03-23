import { ChangeEvent } from 'react';
import { childrenType, SxType } from './common';

export type ButtonPropsType = {
  sx?: SxType;
  onClick?: () => void;
} & childrenType;

export interface InputPropsType {
  name: string;
  placeholder: string;
  type: string;
  value: string;
  sx?: SxType;
  // eslint-disable-next-line no-unused-vars
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
