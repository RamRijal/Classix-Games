import { QuizData } from '@/data/QuizData'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

const QuizGame = () => {
    return (
        <Box>
            {QuizData.map((item) => {
                return (
                    <Box key={item.category} sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'left', padding: 12 }} >
                        <Typography variant='h5'>{item.category}</Typography>
                        {item.data.map((qns) => {
                            return (
                                <Box key={qns.answer} sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'left', backgroundColor: 'gray', padding: 2 }}>
                                    <Typography variant='h6'>
                                        {qns.question}
                                    </Typography>
                                    {qns.options.map((option) => {
                                        return (
                                            <Stack key={option} direction='column'>
                                                <Box sx={{ display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'left', backgroundColor: 'white', padding: 2 ,gap:2}}>
                                                    <Typography variant='body1'>
                                                        {option}
                                                    </Typography>
                                                </Box>
                                            </Stack>
                                        )
                                    })

                                    }
                                </Box>
                            )
                        })}
                    </Box>
                )
            })}
        </Box>
    )
}

export default QuizGame