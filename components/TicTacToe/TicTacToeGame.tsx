'use client'
import { Box, Button, Container, Paper, Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const TicTacToeGame = () => {
    const theme = useTheme();
    const [started, setStarted] = useState(false);
    const [categoryIndex, setCategoryIndex] = useState<number>(0);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>('');
    const [points, setPoints] = useState(0);
    const [timer, setTimer] = useState(20);
    const [gameOver, setGameOver] = useState(false);

    const startGame = () => {
        setStarted(true);
        setCategoryIndex(Math.floor(Math.random() * 5));
        setQuestionIndex(0);
        setPoints(0);
        setTimer(20);
        setGameOver(false);
    }

    useEffect(() => {
        if (started && timer > 0) {
            const countdown = setTimeout(() => setTimer(timer - 1), 1000);
            return () => clearTimeout(countdown);
        } else if (timer === 0) {
            setSelectedOption('');
            // setNextQuestion();
        }
    }, [timer, started]);
    return (
        <Container maxWidth="md" sx={{ py: 4, alignContent: 'center' }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
            }}>
                <Paper
                    elevation={2}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: "center",
                        alignContent: "center",
                        alignItems: "center",
                        p: 3,
                        gap: 2,
                        borderRadius: 2,
                        backgroundColor: theme.palette.background.default
                    }}
                >
                    {started ?
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
                            <Typography variant="h4" sx={{ color: theme.palette.text.disabled }}>TicTacToe {
                                questionIndex + 1
                            }
                            </Typography>
                            {
                                ['123', '456', '789'].map((boxes) => {
                                    return <Box
                                        key={boxes}
                                        sx={{
                                            display: 'flex', justifyContent: 'center',
                                            alignItems: 'center',
                                            p: 1,
                                        }}>
                                        {boxes.split("").map((item) => {
                                            return <>
                                                <Button
                                                    variant="contained"
                                                    sx={{
                                                        backgroundColor: theme.palette.background.default,
                                                        color: theme.palette.text.disabled,
                                                        border: 'none',
                                                    }}
                                                >
                                                    {item}
                                                </Button></>
                                        })}

                                    </Box>
                                })
                            }

                        </Box>
                        :
                        <>
                            <Typography variant='h2' sx={{ color: theme.palette.text.primary, fontWeight: 700, fontSize: 60 }}>
                                TicTacToe
                            </Typography>
                            <Box sx={{ marginY: 2 }}>
                                <Image src={'/tic-tac-toe.svg'} height={250} width={250} alt='' />
                            </Box>
                            <Button
                                onClick={startGame}
                                sx={{
                                    bgcolor: theme.palette.success.dark,
                                    color: theme.palette.common.white,
                                    p: 2,
                                    boxShadow: "inherit",
                                    maxWidth: '250px',
                                    '&: hover': {
                                        bgcolor: theme.palette.success.main,
                                        color: theme.palette.common.white,
                                    }
                                }}>
                                Press Play to Start
                            </Button>
                            <Stack direction={'row'} sx={{ width: '100%', padding: 2, justifyContent: 'space-between' }}>
                                <Typography variant='h5' sx={{ textWrap: 'nowrap' }}>Choose :</Typography>
                                <Typography variant='h5' sx={{ textWrap: 'nowrap' }}>X or O</Typography>
                            </Stack>
                        </>
                    }
                </Paper>
            </Box >
        </Container >
    );
};

export default TicTacToeGame;
// 
/*
import { useState } from 'react'
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"




type Player = 'X' | 'O' | null

interface BoardState {
    squares: Player[]
    xIsNext: boolean
}

const TicTacToe = () => {



    const [state, setState] = useState<BoardState>({
        squares: Array(9).fill(null),
        xIsNext: true
    })
    const [status, setStatus] = useState<string>('Next player: X')




    const handleClick = (index: number): void => {
        if (calculateWinner(state.squares) || state.squares[index]) return

        const nextSquares = [...state.squares]
        nextSquares[index] = state.xIsNext ? 'X' : 'O'

        setState({
            squares: nextSquares,
            xIsNext: !state.xIsNext
        })
    }

    const calculateWinner = (squares: Player[]): Player | null => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ]

        for (const [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }
        return null
    }

    const resetGame = (): void => {
        setState({
            squares: Array(9).fill(null),
            xIsNext: true
        })
        setStatus('Next player: X')
    }




    const winner = calculateWinner(state.squares)
    if (winner) {
        setStatus(`Winner: ${winner}`)
    } else if (!state.squares.includes(null)) {
        setStatus("Game is a draw!")
    }

    return (
        <div className="flex flex-col items-center gap-6 p-6">
            <div className="text-xl font-semibold">{status}</div>

            <Card className="w-[300px] bg-background">
                <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-2">
                        {state.squares.map((value, index) => (
                            <Button
                                key={index}
                                variant="outline"
                                className="aspect-square text-2xl font-bold hover:bg-accent"
                                onClick={() => handleClick(index)}
                                disabled={!!value || !!winner}
                            >
                                {value}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Button
                onClick={resetGame}
                variant="outline"
                className="gap-2"
            >
                <RefreshCcw className="text-current" />
                Reset Game
            </Button>
        </div>
    )
}

export default TicTacToe
*/