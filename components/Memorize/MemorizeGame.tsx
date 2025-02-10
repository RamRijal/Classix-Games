'use client'
import { MemoryItem } from '@/data/MemorizeData';
import { MemoryCardType } from '@/types/memorize';
import { Box, Button, Container, Paper, Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import MemorizeCard from './MemorizeCard';

const createBoard = (): MemoryCardType[] => {
    const shuffledObjects = [...MemoryItem, ...MemoryItem].sort(() => Math.random() - 0.5)
    return shuffledObjects.slice(0, 36).map((object, index) => ({
        id: index,
        object,
        isFlipped: false,
        isMatched: false,
    }))
}

const MemorizeGame = () => {
    const [startedMemory, setStartedMemory] = useState(false);
    const [moves, setMoves] = useState(0);

    const theme = useTheme();

    const startGame = () => {
        setStartedMemory(true);
    };

    // Game Logic
    const [cards, setCards] = useState<MemoryCardType[]>(createBoard());
    const [flippedCards, setFlippedCards] = useState<number[]>([]);
    const [matchedPairs, setMatchedPairs] = useState<number>(0);
    const [isChecking, setIsChecking] = useState(false);


    useEffect(() => {
        if (flippedCards.length === 2) {
            setIsChecking(true);
            const [firstCard, secondCard] = flippedCards;

            if (cards[firstCard].object === cards[secondCard].object) {
                setCards((prevCards) => prevCards.map((card) =>
                    card.id === firstCard || card.id === secondCard ?
                        { ...card, isMatched: true } :
                        card,
                ),
                );
                setMatchedPairs((prev) => prev + 1);
                setFlippedCards([]);
                setIsChecking(false)
            } else {
                setTimeout(() => {
                    setCards((prevCards) =>
                        prevCards.map((card) =>
                            card.id === firstCard || card.id === secondCard ? { ...card, isFlipped: false } : card,
                        ),
                    );
                    setFlippedCards([]);
                    setIsChecking(false);
                }, 1000); // Reduced from 6000ms to 1000ms for better UX
            }
        }
    }, [flippedCards, cards]);

    const handleCardClick = (id: number) => {
        if (!isChecking && flippedCards.length < 2 && !cards[id].isFlipped && !cards[id].isMatched) {
            setCards((prevCards) =>
                prevCards.map((card) => (card.id === id ? { ...card, isFlipped: true } : card))
            );
            setFlippedCards((prev) => [...prev, id]);
        }
    };

    const resetGame = () => {
        setCards(createBoard());
        setFlippedCards([]);
        setMatchedPairs(0);
    };

    return (
        <Container maxWidth="md" sx={{ py: 4, alignContent: 'center' }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <Paper
                    elevation={2}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: "center",
                        alignItems: "center",
                        p: 3,
                        gap: 2,
                        borderRadius: 2,
                        backgroundColor: theme.palette.background.default
                    }}
                >
                    {startedMemory ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, width: '60%' }}>
                            <Typography variant="h4" gutterBottom>
                                Memory Card Game
                            </Typography>
                            <Stack direction="row" spacing={4} sx={{ mb: 2 }}>
                                <Typography variant="h6">
                                    Pairs: {matchedPairs} / 18
                                </Typography>
                                <Typography variant="h6">
                                    Moves: {moves}
                                </Typography>
                            </Stack>
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: 'repeat(4, 1fr)',
                                        sm: 'repeat(6, 1fr)'
                                    },
                                    gap: 1,
                                    width: '100%',
                                    maxWidth: '800px',
                                    margin: 'auto',
                                }}
                            >
                                {cards.map((card) => (
                                    <Box key={card.id} sx={{ width: '100%' }}>
                                        <MemorizeCard
                                            card={card}
                                            onClick={() => handleCardClick(card.id)}
                                        />
                                    </Box>
                                ))}
                            </Box>

                            <Button
                                variant="contained"
                                onClick={resetGame}
                                sx={{ marginTop: 2 ,bgcolor:theme.palette.success.dark}}
                            >
                                Reset Game
                            </Button>
                        </Box>
                    ) : (
                        <>
                            <Typography
                                variant='h2'
                                sx={{
                                    color: theme.palette.text.primary,
                                    fontWeight: 700,
                                    fontSize: { xs: 40, sm: 60 }
                                }}
                            >
                                Memorize
                            </Typography>
                            <Box sx={{ marginY: 2 }}>
                                <Image
                                    src={'/pngegg (1).png'}
                                    height={220}
                                    width={220}
                                    alt='Memory Game Icon'
                                    priority
                                />
                            </Box>
                            <Button
                                onClick={startGame}
                                sx={{
                                    bgcolor: theme.palette.success.dark,
                                    color: theme.palette.common.white,
                                    p: 2,
                                    boxShadow: "inherit",
                                    maxWidth: '250px',
                                    '&:hover': {
                                        bgcolor: theme.palette.success.main,
                                    }
                                }}
                            >
                                Press Play to Start
                            </Button>
                            <Stack
                                direction={{ xs: 'column', sm: 'row' }}
                                spacing={2}
                                sx={{
                                    width: '100%',
                                    padding: 2,
                                    justifyContent: 'space-between',
                                    textAlign: 'center'
                                }}
                            >
                                <Typography variant='h5'>How to play:</Typography>
                                <Typography variant='h5'>Match pairs of cards to win!</Typography>
                            </Stack>
                        </>
                    )}
                </Paper>
            </Box>
        </Container>
    );
};

export default MemorizeGame;
