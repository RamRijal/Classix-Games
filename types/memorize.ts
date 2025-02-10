export interface MemoryCardProps {
  card: {
    object: string;
    isFlipped: boolean;
    isMatched: boolean;
  };
  onClick: () => void;
}

export interface MemoryCardType {
  id: number;
  object: string;
  isFlipped: boolean;
  isMatched: boolean;
}
