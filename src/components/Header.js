"use client";

import { useAuth } from "@/context/AuthContext";
import { Box, Button, Container, Stack, useMediaQuery, useTheme } from "@mui/material";
import Logo from "./Logo";

export default function Header() {
  const { user, handleSignOut } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!user) return;

  return (
    <Box
      component="header"
      sx={{
        position: "fixed",
        top: 0,
        zIndex: 1,
        width: "100vw",
        backdropFilter: "blur(10px)",
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Logo width={isMobile ? 200 : 300} />
        <Stack>
          <Button
            variant="outlined"
            onClick={handleSignOut}
            sx={{
              alignSelf: "end",
              mt: ".5rem",
              color: "lightgray",
              borderColor: "gray",
              "&:hover": { borderColor: "lightgray" },
            }}
          >
            Sign Out
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
