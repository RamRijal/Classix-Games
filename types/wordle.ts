export interface WordGridProps {
  guesses: string[];
  currentGuess: string;
  solution: string;
  evaluatedGuesses: string[][];
}

export interface KeyboardProps {
  onChar: (value: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  guesses: string[];
  solution: string;
  evaluatedGuesses: string[][];
  isChecking: boolean;
}
export type KeyProps = {
  value: string;
  onClick: () => void;
  width?: number;
  status?: string;
  children?: React.ReactNode;
  isChecking?: boolean;
};
