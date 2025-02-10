import { KeyboardProps, KeyProps } from "@/types/wordle"
import { Box, Button, useTheme } from "@mui/material"

export const Keyboard = ({ onChar, onDelete, onEnter, guesses, evaluatedGuesses, isChecking, }: KeyboardProps) => {
    const theme = useTheme()
    const charStatuses = getCharStatuses(guesses, evaluatedGuesses)

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {["qwertyuiop", "asdfghjkl", "zxcvbnm"].map((row, i) => (
                <Box key={i} sx={{ display: "flex", mb: 1 }}>
                    {i === 2 && (
                        <Key width={65.4} value="ENTER" onClick={onEnter} isChecking={isChecking} theme={theme}>
                            {isChecking ? "..." : "ENTER"}
                        </Key>
                    )}
                    {row.split("").map((key) => (
                        <Key key={key} value={key} onClick={() => onChar(key)} status={charStatuses[key]} theme={theme} />
                    ))}
                    {i === 2 && (
                        <Key width={65.4} value="DELETE" onClick={onDelete} theme={theme}>
                            DELETE
                        </Key>
                    )}
                </Box>
            ))}
        </Box>
    )
}
// CUSTOM KEY COMPONENT FOR ALPHABETS
// CUSTOM CHARACTER/ALPHABET STATUS COMPONENT FOR ALPHABETS
const Key = ({ value, onClick, width = 60, status, children, isChecking = false, }: KeyProps) => {
    const theme = useTheme()

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
        <Button
            variant="contained"
            sx={{
                minWidth: `${width}px`,
                height: "58px",
                mX: 0.25,
                backgroundColor,
                color,
                "&:hover": {
                    backgroundColor,
                    opacity: 0.8,
                },
            }}
            onClick={onClick}
            disabled={isChecking}
        >
            {children || value.toUpperCase()}
        </Button>
    )
}

const getCharStatuses = (guesses: string[], evaluatedGuesses: string[][]) => {
    const charObj: { [key: string]: string } = {}

    guesses.forEach((word, guessIndex) => {
        const evaluation = evaluatedGuesses[guessIndex]
        if (!evaluation) return

        word.split("").forEach((letter, i) => {
            const status = evaluation[i]
            if (status === "correct") {
                charObj[letter] = "correct"
            } else if (status === "present" && charObj[letter] !== "correct") {
                charObj[letter] = "present"
            } else if (status === "absent" && !charObj[letter]) {
                charObj[letter] = "absent"
            }
        })
    })

    return charObj
}

