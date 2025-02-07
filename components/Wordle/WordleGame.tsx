"use client"

import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import WordGrid from "@/components/Wordle/WordleGrid"
import { getRandomWord, isValidWord } from "@/utils/WordsAPI"
import { Keyboard } from "./KeyBoard"
import { Box, Typography, useTheme } from "@mui/material"

const WORD_LENGTH = 5 //Only 5 letter words accepted
const MAX_GUESSES = 6 //Only 6 attempts accepted

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


export default function WordleGame() {
    const [solution, setSolution] = useState("")//Main Answer
    const [guesses, setGuesses] = useState<string[]>([])//Each guesses
    const [currentGuess, setCurrentGuess] = useState("")//Latest Guess
    const [gameOver, setGameOver] = useState(false) //Boolean to set if games over
    const [evaluatedGuesses, setEvaluatedGuesses] = useState<string[][]>([])
    const [isChecking, setIsChecking] = useState(false)

    const theme=useTheme();

    //gets random word for game start
    useEffect(() => {
        setSolution(getRandomWord())
    }, [])

    //in case user doesnt input 5 guesses yet and games not over sets currentguess as input
    const onChar = (value: string) => {
        if (currentGuess.length < WORD_LENGTH && !gameOver) {
            setCurrentGuess(`${currentGuess}${value}`)
        }
    }

    //cuts the last guess
    const onDelete = () => {
        setCurrentGuess(currentGuess.slice(0, -1))
    }

    const onEnter = async () => {
        if (gameOver || isChecking) return

        if (currentGuess.length === WORD_LENGTH) {
            setIsChecking(true)
            const valid = await isValidWord(currentGuess)
            setIsChecking(false)

            if (valid) {
                const newGuesses = [...guesses, currentGuess]
                setGuesses(newGuesses)
                const newEvaluatedGuesses = [...evaluatedGuesses, checkGuess(currentGuess, solution)]
                setEvaluatedGuesses(newEvaluatedGuesses)
                setCurrentGuess("")

                if (currentGuess.toLowerCase() === solution.toLowerCase()) {
                    setGameOver(true)
                    toast.success("Congratulations! You've guessed the word!")
                } else if (newGuesses.length === MAX_GUESSES) {
                    setGameOver(true)
                    toast.error(`Game over! The word was: ${solution}`)
                }
            } else {
                toast.error("Not a valid word")
            }
        } else {
            toast.error("Word must be 5 letters long")
        }
    }

    const resetGame = () => {
        setSolution(getRandomWord())
        setGuesses([])
        setEvaluatedGuesses([])
        setCurrentGuess("")
        setGameOver(false)
    }

    const checkGuess = (guess: string, solution: string): string[] => {
        const result: string[] = Array(WORD_LENGTH).fill("absent")
        const solutionArray = solution.toLowerCase().split("")
        const guessArray = guess.toLowerCase().split("")
        const solutionCharCount: { [key: string]: number } = {}

        // First pass: Mark correct letters
        for (let i = 0; i < WORD_LENGTH; i++) {
            const solutionChar = solutionArray[i]
            const guessChar = guessArray[i]

            if (guessChar === solutionChar) {
                result[i] = "correct"
                solutionCharCount[solutionChar] = (solutionCharCount[solutionChar] || 0) + 1
            }
        }

        // Second pass: Mark present letters
        for (let i = 0; i < WORD_LENGTH; i++) {
            const guessChar = guessArray[i]
            if (result[i] !== "correct" && solutionArray.includes(guessChar)) {
                const totalCount = solutionArray.filter((char) => char === guessChar).length
                const markedCount = solutionCharCount[guessChar] || 0
                if (markedCount < totalCount) {
                    result[i] = "present"
                    solutionCharCount[guessChar] = markedCount + 1
                }
            }
        }

        return result
    }

    return (
        <Box sx={{display:"flex",flexDirection:"column",gap:2,alignItems:'center'}}>
            <WordGrid
                guesses={guesses}
                currentGuess={currentGuess}
                solution={solution}
                evaluatedGuesses={evaluatedGuesses} />
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
                <Box sx={{mt:2}}>
                    <Typography variant="h3" sx={{mb:1,color:theme.palette.text.primary}} className="text-neutral-800 mb-2">
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

