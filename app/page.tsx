import WordleGame from "@/components/Wordle/WordleGame";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box component="main" sx={{
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white",
      flexGrow: 1,
      padding: 3
    }}>
     
      <Typography variant="h1" sx={{
        fontSize: 44,
        fontWeight: 800,
        marginBottom: '8px',
        color: "gray"
      }}>
        Wordle Clone
      </Typography>
      <WordleGame />
    </Box>);
}
