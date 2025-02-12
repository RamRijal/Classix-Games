'use client'
import { GAMES } from "@/data/MainData";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
    const theme = useTheme()
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                },
                gap: 4,
                width: "100%",
                maxWidth: "900px",
                margin: "auto",
                marginY: 4,
            }}
        >
            {GAMES.map((card) => (
                <Box
                    key={card.id}
                    sx={{
                        width: "100%",
                        minHeight: "380px",
                        bgcolor: theme.palette.grey[500],
                        p: 2,
                        borderRadius: 2,
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                            transform: "scale(1.025)",
                            boxShadow: 6,
                        },
                    }}
                >
                    <Link href={card.link} passHref>
                        <Box
                            sx={{
                                minHeight: 200,
                                aspectRatio: "1/1",
                                bgcolor: theme.palette.background.default,
                                position: "relative",
                                borderRadius: 2,
                                overflow: "hidden",
                            }}
                        >
                            <Image
                                alt={card.name}
                                src={card.image}
                                fill
                                style={{ objectFit: "cover" }}
                                priority={card.id <= 3} // Prioritize loading for the first 3 images
                            />
                        </Box>
                        <Stack direction={"column"} sx={{ marginTop: 1 }}>
                            <Typography
                                variant="h4"
                                sx={{ fontWeight: 700, color: theme.palette.common.white, marginY: 0.5 }}
                            >
                                {card.name}
                            </Typography>
                            <Typography
                                variant="body1"
                                sx={{ fontWeight: 300, color: theme.palette.grey[200]}}
                            >
                                {card.description}
                            </Typography>
                        </Stack>
                    </Link>
                </Box>
            ))}
        </Box>)
}

export default HomePage
