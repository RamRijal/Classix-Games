import WordleGame from '@/components/Wordle/WordleGame'
import { Box, Container, Typography } from '@mui/material'
import React from 'react'

const Wordle = () => {
    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ my: 4, textAlign: "center" }}>
                    <Typography variant="h3" component="h1" gutterBottom>
                        Wordle Clone
                    </Typography>
                    <WordleGame />
                </Box>
            </Container>        </>)
}

export default Wordle