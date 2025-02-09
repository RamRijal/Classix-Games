'use client'
import { QuizData } from '@/data/QuizData';
import { Box, Button, Container, Paper, Stack, Typography, useTheme } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const QuizGame = () => {
    const theme = useTheme();
    const [started, setStarted] = useState(false);
    const [categoryIndex, setCategoryIndex] = useState<number | null>(0);
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
// Timer for 20 seconds
    useEffect(()=>{
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
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center',gap:1 }}>
                            <Typography variant="h4" sx={{ color: theme.palette.text.disabled }}>Question {
                                questionIndex + 1
                            }</Typography>
                            <Typography variant="h5" sx={{ color: theme.palette.success.dark, justifyContent: 'center', alignItems: 'center' }}>
                                {QuizData[categoryIndex].category}
                            </Typography>
                            
                            <Typography variant='h6' sx={{ color: theme.palette.text.disabled }}>Time left: {timer} sec</Typography>

                            
                        </Box>
                        :
                        <>
                            <Typography variant='h2' sx={{ color: theme.palette.text.primary, fontWeight: 700, fontSize: 60 }}>
                                Quiz Game
                            </Typography>
                            <Image src={'/brain.png'} height={300} width={300} alt='' />
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
                                <Typography variant='h5' sx={{ textWrap: 'nowrap' }}>20 questions</Typography>
                                <Typography variant='h5' sx={{ textWrap: 'nowrap' }}>20 seconds</Typography>
                            </Stack>
                        </>
                    }
                    
                </Paper>
            </Box>
        </Container>
    );
};

export default QuizGame;
/*import { useState, useEffect } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

const quizData = [
  {
    category: "Science & Tech",
    questions: [
      { "question": "What is the chemical symbol for gold?", "options": ["Ag", "Au", "Pb", "Fe"], "answer": "Au" },
      { "question": "What planet is known as the Red Planet?", "options": ["Venus", "Mars", "Jupiter", "Saturn"], "answer": "Mars" }
    ]
  },
  {
    category: "Cartoons",
    questions: [
      { "question": "What is the name of SpongeBob's pet snail?", "options": ["Gary", "Tom", "Larry", "Jerry"], "answer": "Gary" },
      { "question": "Who is the main character in 'Rick and Morty'?", "options": ["Rick", "Morty", "Both", "Summer"], "answer": "Both" }
    ]
  }
];

export default function QuizApp() {
  const [started, setStarted] = useState(false);
  const [categoryIndex, setCategoryIndex] = useState<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timer, setTimer] = useState(20);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (started && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      setSelectedAnswer(null);
      setNextQuestion();
    }
  }, [timer, started]);

  const startGame = () => {
    setCategoryIndex(Math.floor(Math.random() * quizData.length));
    setQuestionIndex(0);
    setScore(0);
    setStarted(true);
    setGameOver(false);
    setTimer(20);
  };

  const handleAnswer = (option: string) => {
    setSelectedAnswer(option);
    if (categoryIndex !== null) {
      const correctAnswer = quizData[categoryIndex].questions[questionIndex].answer;
      if (option === correctAnswer) setScore(score + 1);
    }
  };

  const setNextQuestion = () => {
    if (categoryIndex !== null && questionIndex < quizData[categoryIndex].questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(null);
      setTimer(20);
    } else {
      setGameOver(true);
    }
  };

  if (!started) {
    return (
      <Card >
        <CardContent>
          <Typography variant="h4">IQ Quiz</Typography>
          <Button variant="contained" onClick={startGame}>Press Start</Button>
        </CardContent>
      </Card>
    );
  }

  if (gameOver) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h4">Game Over</Typography>
          <Typography variant="h6">Your Score: {score}</Typography>
          <Button variant="contained" onClick={startGame}>Play Again</Button>
        </CardContent>
      </Card>
    );
  }

  if (categoryIndex === null) return null;
  const currentQuestion = quizData[categoryIndex].questions[questionIndex];

  return (
    <Card >
      <CardContent>
        <Typography variant="h5">{quizData[categoryIndex].category}</Typography>
        <Typography variant="h6">{currentQuestion.question}</Typography>
        <Typography>Time left: {timer} sec</Typography>
        {currentQuestion.options.map((option) => (
          <Button key={option} variant="contained" onClick={() => handleAnswer(option)} disabled={!!selectedAnswer}>
            {option}
          </Button>
        ))}
        {selectedAnswer && (
          <Button variant="contained" onClick={setNextQuestion}>Next</Button>
        )}
      </CardContent>
    </Card>
  );
}
*/