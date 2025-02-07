export function checkGuess(guess: string, solution: string) {
  const guessArray = guess.split("");
  const solutionArray = solution.split("");

  const result = Array(5).fill("absent");

  // First, check for correct letters
  guessArray.forEach((letter, i) => {
    if (letter === solutionArray[i]) {
      result[i] = "correct";
      solutionArray[i] = ''; // Mark this letter as used
    }
  });

  // Then, check for present letters
  guessArray.forEach((letter, i) => {
    if (result[i] !== "correct" && solutionArray.includes(letter)) {
      result[i] = "present";
      solutionArray[solutionArray.indexOf(letter)] = ''; // Mark this letter as used
    }
  });

  return result;
}
