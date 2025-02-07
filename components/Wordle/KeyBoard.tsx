import { KeyboardProps, KeyProps } from "@/types/wordle"
import { Box } from "@mui/material"

export const Keyboard = ({ onChar, onDelete, onEnter, guesses, evaluatedGuesses, isChecking, }: KeyboardProps) => {

    // const LightTheme=useTheme()
    // const DarkTheme=useTheme()
    const charStatuses = getCharStatuses(guesses, evaluatedGuesses)

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
            {['qwertyuiop', 'asdfghjkl', 'zxcvbnm'].map((row, i) => (
                <Box key={i} sx={{ display: "flex", justifyContent: "center", mb: 1, width: '100%' }}>
                    {/* ENTER BUTTON */}
                    {i === 2 &&
                        (
                            <Key width={65.4} value="ENTER" onClick={onEnter} isChecking={isChecking} >
                                {isChecking ? "..." : "ENTER"}
                            </Key>
                        )
                    }
                    {/* KEY FOR EACH ALPHABETS */}
                    {row.split("").map((key) => (
                        <Key key={key} value={key} onClick={() => onChar(key)} status={charStatuses[key]}  />
                    ))
                    }
                    {/* DELETE BUTTON */}
                    {i === 2 && (
                        <Key width={65.4} value="DELETE" onClick={onDelete} >
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
const Key = ({ value, onClick, width = 40, status, children, isChecking = false, }: KeyProps) => {
    let backgroundColor = "bg-neutral-300"
    let textColor = "text-neutral-800"

    if (status === "correct") {
        backgroundColor = "bg-green-500"
        textColor = "text-white"
    } else if (status === "present") {
        backgroundColor = "bg-yellow-500"
        textColor = "text-white"
    } else if (status === "absent") {
        backgroundColor = "bg-neutral-400"
        textColor = "text-white"
    }

    return (
        <button
            className={`${backgroundColor} ${textColor} font-bold rounded mx-0.5 text-sm`}
            style={{ width: `${width}px`, height: "58px" }}
            onClick={onClick}
            disabled={isChecking}
        >
            {children || value.toUpperCase()}
        </button>
    )
}

const getCharStatuses=(guesses: string[], evaluatedGuesses: string[][])=> {
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

