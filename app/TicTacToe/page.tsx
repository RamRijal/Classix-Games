import TicTacToeGame from '@/components/TicTacToe/TicTacToeGame'
import { Box, Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'

const TicTacToe = () => {
    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ py:3, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>

                    <Stack direction={'row'} sx={{ justifyContent: 'center', alignItems: 'center', mb: 4 }}>
                        <Image src={'/tictactoe.svg'} alt='' height={100} width={100} />
                        <Typography variant='h3' sx={{ fontSize: 60, fontWeight: 800 }}>TicTacToe</Typography>
                    </Stack>
                    <TicTacToeGame />
                </Box>
            </Container>
        </>
    )
}

export default TicTacToe