'use client'
import { MemoryCardProps } from '@/types/memorize'
import { Paper, Typography } from '@mui/material'

export const MemorizeCard = ({ card, onClick }: MemoryCardProps) => {
    return (
        <Paper
            elevation={3}
            sx={{
                width: "100%",
                aspectRatio: "1/1",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: card.isFlipped || card.isMatched ? "default" : "pointer",
                backgroundColor: card.isMatched ? "transparent" : card.isFlipped ? "white" : "#012F8D",
                border: card.isMatched ? "1px dashed #ccc" : "none",
                transition: "background-color 0.3s ease",
            }}
            onClick={() => {
                if (!card.isFlipped && !card.isMatched) {
                    onClick();
                }
            }}
        >
            {(card.isFlipped || card.isMatched) && (
                <Typography
                    variant="h4"
                    sx={{
                        transform: 'rotateY(180deg)',
                        fontSize: { xs: '1.5rem', sm: '2.5rem' }
                    }}
                >
                    {card.object}
                </Typography>
            )}
        </Paper>
    )
}

export default MemorizeCard;
