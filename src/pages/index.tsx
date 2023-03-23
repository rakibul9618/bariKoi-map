import React, { useState } from 'react';
import Head from 'next/head';
import { Inter } from 'next/font/google';
import { Box } from '@mui/material';
import Map from '@/components/sections/Map';
import SearchInfo from '@/components/sections/SearchInfo';

// inter google front
const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [isExpand, setIsExpand] = useState<boolean>(true);

  return (
    <>
      <Head>
        <title>Barikoi | Local map</title>
        <meta
          name="description"
          content="Local map for different cities in Bangladesh"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box
        className={inter.className}
        sx={{
          display: 'flex',
          height: '100vh',
          position: 'relative',
        }}
      >
        <SearchInfo isExpand={isExpand} setIsExpand={setIsExpand} />
        <Map isExpand={isExpand} />
      </Box>
    </>
  );
}
