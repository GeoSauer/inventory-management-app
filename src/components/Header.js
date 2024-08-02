import { useAuth } from "@/context/authContext";
import { Box, Button, Container, Typography } from "@mui/material";

export default function Header() {
  const { user, handleSignOut } = useAuth();

  if (!user) return;

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "palegreen",
      }}
    >
      <Container sx={{ display: "flex", justifyContent: "end" }}>
        <Typography>Welcome {user.email}!</Typography>
        <Button onClick={handleSignOut}>Sign Out</Button>
      </Container>
    </Box>
  );
}
