"use client";

import React from "react";
import { Container, Box, Typography, Button, useTheme, useMediaQuery } from "@mui/material";
import { useRouter } from "next/navigation";
import Logo from "@/components/Logo";

const Home = () => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backgroundImage: "url(/images/landing.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          zIndex: -1,
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          width: "100%",
          padding: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
          zIndex: 1,
        }}
      >
        <Logo width={isMobile ? 200 : 300} />
        <Button
          variant="text"
          onClick={() => router.push("/auth")}
          sx={{
            padding: isMobile ? "0.5rem 1rem" : "1rem 2rem",
            alignSelf: "center",
            color: "gray",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(10px)",
          }}
        >
          Sign In
        </Button>
      </Box>
      <Container
        sx={{
          zIndex: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          py: isMobile ? "1rem" : "2.5rem",
          borderTop: "1px solid gray",
          borderBottom: "1px solid gray",
          gap: "1.5rem",
          textAlign: "center",
          marginTop: "-10rem",
        }}
      >
        <Typography variant={isMobile ? "h4" : "h3"} color={"gray"}>
          Welcome to CupboardCompass
        </Typography>
        <Typography variant={isMobile ? "h6" : "h5"} fontWeight={"300"} color={"gray"}>
          Your one stop shop for pantry perfection
        </Typography>
        <Button
          variant="text"
          sx={{
            padding: isMobile ? "0.5rem 1rem" : "1rem 2rem",
            alignSelf: "center",
            color: "gray",
            "&:hover": { color: "darkgray" },
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
          onClick={() => router.push("/auth")}
        >
          Come on in!
        </Button>
      </Container>
    </Box>
  );
};

export default Home;
