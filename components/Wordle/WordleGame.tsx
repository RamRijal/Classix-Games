//Steps:
//1. Get a random word from the API
//2. Create a grid with the word=>(WORDLEGRID.tsx)
//3. Create a keyboard with the letters=>(KEYBOARD.tsx)
//4. Handle user input
//5. Check if the input is valid
//6. Check if the input is correct
//7. Update the grid and keyboard accordingly
//8. Check if the game is over
//9. Display the result
"use client"

import { useState, useEffect, useCallback } from "react"
import { toast } from "react-hot-toast"
import WordGrid from "@/components/Wordle/WordleGrid"
import { getRandomWord, isValidWord } from "@/utils/WordsAPI"
import { Keyboard } from "./KeyBoard"
import { Box, Typography, useTheme } from "@mui/material"

const WORD_LENGTH = 5 // Only 5-letter words accepted
const MAX_GUESSES = 6 // Only 6 attempts accepted

export default function WordleGame() {
    const [solution, setSolution] = useState<string>("") // Ensure string type
    const [guesses, setGuesses] = useState<string[]>([])
    const [currentGuess, setCurrentGuess] = useState<string>("")
    const [gameOver, setGameOver] = useState<boolean>(false)
    const [evaluatedGuesses, setEvaluatedGuesses] = useState<string[][]>([])
    const [isChecking, setIsChecking] = useState<boolean>(false)

    const theme = useTheme()

    // Fetch a random word at game start
    useEffect(() => {
        const fetchWord = async () => {
            const word = await getRandomWord()
            setSolution(word || "")
        }
        fetchWord()
    }, [])

    const onChar = useCallback((value: string) => {
        if (currentGuess.length < WORD_LENGTH && !gameOver) {
            setCurrentGuess((prev) => prev + value)
        }
    }, [currentGuess, gameOver])

    const onDelete = useCallback(() => {
        setCurrentGuess((prev) => prev.slice(0, -1))
    }, [])

    const checkGuess = (guess: string, solution: string): string[] => {
        const result: string[] = Array(WORD_LENGTH).fill("absent")
        const solutionArray = solution.toLowerCase().split("")
        const guessArray = guess.toLowerCase().split("")
        const solutionCharCount: Record<string, number> = {}

        // First pass: Mark correct letters
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (guessArray[i] === solutionArray[i]) {
                result[i] = "correct"
                solutionCharCount[solutionArray[i]] = (solutionCharCount[solutionArray[i]] || 0) + 1
            }
        }

        // Second pass: Mark present letters
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (result[i] !== "correct" && solutionArray.includes(guessArray[i])) {
                const totalCount = solutionArray.filter((char) => char === guessArray[i]).length
                const markedCount = solutionCharCount[guessArray[i]] || 0
                if (markedCount < totalCount) {
                    result[i] = "present"
                    solutionCharCount[guessArray[i]] = markedCount + 1
                }
            }
        }

        return result
    }

    const onEnter = useCallback(async () => {
        if (gameOver || isChecking) return

        if (currentGuess.length === WORD_LENGTH) {
            setIsChecking(true)
            const valid = await isValidWord(currentGuess)
            setIsChecking(false)

            if (valid) {
                setGuesses((prev) => [...prev, currentGuess])
                setEvaluatedGuesses((prev) => [...prev, checkGuess(currentGuess, solution)])
                setCurrentGuess("")

                if (currentGuess.toLowerCase() === solution.toLowerCase()) {
                    setGameOver(true)
                    toast.success("Congratulations! You've guessed the word!")
                } else if (guesses.length + 1 === MAX_GUESSES) {
                    setGameOver(true)
                    toast.error(`Game over! The word was: ${solution}`)
                }
            } else {
                toast.error("Not a valid word")
            }
        } else {
            toast.error("Word must be 5 letters long")
        }
    }, [currentGuess, gameOver, guesses, isChecking, solution])

    const resetGame = () => {
        setSolution(getRandomWord() || "")
        setGuesses([])
        setEvaluatedGuesses([])
        setCurrentGuess("")
        setGameOver(false)
    }

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (gameOver) return

            if (event.key === "Enter") {
                onEnter()
            } else if (event.key === "Backspace") {
                onDelete()
            } else if (/^[a-zA-Z]$/.test(event.key)) {
                onChar(event.key.toLowerCase())
            }
        },
        [gameOver, onEnter, onDelete, onChar]
    )

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [handleKeyDown])

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
            <WordGrid
                guesses={guesses}
                currentGuess={currentGuess}
                solution={solution}
                evaluatedGuesses={evaluatedGuesses}
            />
            <Keyboard
                onChar={onChar}
                onDelete={onDelete}
                onEnter={onEnter}
                guesses={guesses}
                solution={solution}
                evaluatedGuesses={evaluatedGuesses}
                isChecking={isChecking}
            />
            {gameOver && (
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h3" sx={{ mb: 1, color: theme.palette.text.primary }}>
                        {currentGuess.toLowerCase() === solution.toLowerCase() ? "You won!" : `The word was: ${solution}`}
                    </Typography>
                    <button
                        onClick={resetGame}
                        className="bg-neutral-300 text-neutral-800 px-4 py-2 rounded hover:bg-neutral-400 transition-colors"
                    >
                        Play Again
                    </button>
                </Box>
            )}
        </Box>
    )
}
