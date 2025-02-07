const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const WORDS = [
  "apple",
  "beach",
  "chair",
  "dance",
  "eagle",
  "flame",
  "grape",
  "house",
  "ivory",
  "jelly",
  "kite",
  "lemon",
  "mango",
  "noble",
  "ocean",
  "piano",
  "quiet",
  "river",
  "solar",
  "table",
  "umbra",
  "vivid",
  "water",
  "xenon",
  "yacht",
  "zebra",
];

export function getRandomWord() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export async function isValidWord(word: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}${word}`);
    return response.ok;
  } catch (error) {
    console.error("Error checking word validity:", error);
    return false;
  }
}