import { EmotionCache } from '@emotion/react';
import type { AppProps } from 'next/app';
import { SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export type childrenType = { children: ReactNode };

export type SxType = SxProps<Theme>;
