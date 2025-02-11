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
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(20);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setStarted(true);
    setCategoryIndex(Math.floor(Math.random() * 5));
    setQuestionIndex(0);
    setScore(0);
    setTimer(20);
    setGameOver(false);
  }
  // Timer for 20 seconds
  useEffect(() => {
    if (started && timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (timer === 0) {
      setSelectedOption('');
      setNextQuestion();
    }
  }, [timer, started]);


  const handleAnswer = (option: string) => {
    setSelectedOption(option);
    if (categoryIndex !== null) {
      const correctAnswer = QuizData[categoryIndex].data[questionIndex].answer;
      if (option === correctAnswer) setScore(score + 1);
    }
  };

  const setNextQuestion = () => {
    if (categoryIndex !== null && questionIndex < QuizData[categoryIndex].data.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedOption(null);
      setTimer(20);
    } else {
      setGameOver(true);
    }
  };

  if (!started) {
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
          </Paper>
        </Box>
      </Container>
    );
  }

  if (gameOver) {
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
              minHeight: "500px",
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

            <Typography variant="h1">Game Over!!</Typography>
            <Image alt='' src={'/pngfind.com-clock-emoji-png-2467162.png'} height={100} width={100} />
            <Typography variant="h4" sx={{ color: 'grey' }}>Your Score: {score}</Typography>
            <Button variant="contained" onClick={startGame}>Play Again</Button>


          </Paper>
        </Box>
      </Container>
    );
  }


  if (categoryIndex === null) return null;
  const currentQuestion = QuizData[categoryIndex].data[questionIndex];
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
            backgroundColor: theme.palette.primary.main
          }}
        >
          {started &&
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: "center", gap: 1, }}>
              <Stack direction={'row'} sx={{ justifyContent: "space-between", width: '100%', borderBottom: 1, borderColor: 'white', paddingBottom: 2, marginBottom: 2 }}>

                <Typography variant="h5" sx={{ color: theme.palette.text.primary, justifyContent: 'left', alignItems: 'center' }}>
                  {QuizData[categoryIndex].category}
                </Typography>
                <Typography variant="h4" sx={{ color: theme.palette.background.default }}>
                  Question {questionIndex + 1}
                </Typography>

                <Typography variant='h6' sx={{ color: theme.palette.text.primary }}>Time left: {timer} sec</Typography>
              </Stack>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: 'center',
                  gap: 1,
                  padding: 3,
                  borderRadius: 2
                  , backgroundColor: theme.palette.grey[300]
                }}>

                <Typography variant="h2" sx={{ color: theme.palette.text.primary, alignItems: "center", mb: 4 }}>
                  {currentQuestion.question}
                </Typography>

                <Stack sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', gap: 1 }}>

                  {currentQuestion.options.map((option) => (
                    <Button
                      key={option}
                      variant="contained"
                      sx={{
                        width: "200px",
                        bgcolor: theme.palette.warning.light,
                        color: theme.palette.text.primary,
                        fontSize: 16,
                        fontWeight: 400
                      }}
                      onClick={() => handleAnswer(option)}
                      disabled={!!selectedOption}
                    >
                      {option}
                    </Button>
                  ))}
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: "center", mt: 4 }}>
                  {selectedOption &&
                    (
                      <Button variant="contained" sx={{ width: "10px", pX: 2, bgcolor: theme.palette.success.dark }} onClick={setNextQuestion}>
                        Next
                      </Button>
                    )
                  }
                </Box>
              </Box>
            </Box>
          }
        </Paper>
      </Box >
    </Container >
  );
};

export default QuizGame;
/*
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