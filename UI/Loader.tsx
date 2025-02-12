import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function Loader() {
    return (
        <Box sx={{ display: 'flex',gap:3 ,justifyContent:"center",alignItems:'center',height:'100vh' }}>
            <CircularProgress sx={{color:"grey"}} />
            <Typography variant='h4'>
                Loading...
            </Typography>
        </Box>
    );
}