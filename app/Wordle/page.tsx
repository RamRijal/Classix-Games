import WordleGame from '@/components/Wordle/WordleGame'
import { Box, Container, Stack, Typography } from '@mui/material'
import Image from 'next/image'

const Wordle = () => {
    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ my: 3, textAlign: "center", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <Box
                        sx={{
                            fontSize: 44,
                            fontWeight: 800,
                            marginBottom: 3,
                        }}
                    >
                        <Stack direction={'row'} sx={{alignItems:'center'}}>
                            <Image src={'/pngwing.com (1).png'} alt='' height={100} width={100} />
                            <Typography variant='h3' sx={{ fontSize: 60, fontWeight: 800 }}>Wordle</Typography>
                        </Stack>
                    </Box>
                    <WordleGame />
                </Box>
            </Container>
        </>)
}

export default Wordle