import { MAX_GUESSES, WORD_LENGTH } from "@/lib/constants"
import { Box, Paper } from "@mui/material"
import { useTheme } from "@mui/material/styles"

interface WordGridProps {
    guesses: string[]
    currentGuess: string
    solution: string
    evaluatedGuesses: string[][]
}

export default function WordGrid({ guesses, currentGuess, evaluatedGuesses }: WordGridProps) {
    const theme = useTheme()
    const allGuesses = [...guesses, currentGuess]
    const emptyRows = MAX_GUESSES - allGuesses.length

    return (
        <Box sx={{ display: "grid", gridTemplateRows: `repeat(${MAX_GUESSES}, 1fr)`, gap: 1, mb: 2 }}>
            {allGuesses.map((guess, i) => (
                <Row
                    key={i}
                    guess={guess}
                    evaluation={i < evaluatedGuesses.length ? evaluatedGuesses[i] : undefined}
                    theme={theme}
                />
            ))}
            {Array.from({ length: emptyRows }).map((_, i) => (
                <Row key={`empty-${i}`} guess="" theme={theme} />
            ))}
        </Box>
    )
}

function Row({ guess, evaluation, theme }: { guess: string; evaluation?: string[]; theme: any }) {
    const tiles = Array.from({ length: WORD_LENGTH })

    return (
        <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${WORD_LENGTH}, 1fr)`, gap: 1 }}>
            {tiles.map((_, i) => (
                <Tile key={i} value={guess[i]} status={evaluation ? evaluation[i] : undefined} theme={theme} />
            ))}
        </Box>
    )
}

function Tile({ value, status, theme }: { value?: string; status?: string; theme: any }) {
    let backgroundColor = theme.palette.grey[300]
    let color = theme.palette.text.primary

    if (status === "correct") {
        backgroundColor = theme.palette.success.main
        color = theme.palette.success.contrastText
    } else if (status === "present") {
        backgroundColor = theme.palette.warning.main
        color = theme.palette.warning.contrastText
    } else if (status === "absent") {
        backgroundColor = theme.palette.grey[700]
        color = theme.palette.getContrastText(theme.palette.grey[700])
    }

    return (
        <Paper
            elevation={2}
            sx={{
                width: 50,
                height: 50,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "1.5rem",
                fontWeight: "bold",
                backgroundColor,
                color,
            }}
        >
            {value?.toUpperCase()}
        </Paper>
    )
}

