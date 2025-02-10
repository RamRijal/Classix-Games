import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <Box component="main" sx={{
      display: "flex",
      minHeight: "100vh",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flexGrow: 1,
      padding: 3
    }}>

      <Typography variant="h1" 
      sx={{
        fontSize: 44,
        fontWeight: 800,
        marginBottom: '8px',
        color: "Gray"
      }}>
        WELCOME TO CLASSIX GAMES
      </Typography>
      <Typography variant="h6" sx={{
        fontSize: 20,
        fontWeight: 600,
        marginBottom: '8px',
        color: "Lightgrey"
      }}>
        Select your choice of game and start playing
      </Typography>
    </Box>);
}
