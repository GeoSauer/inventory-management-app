import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useAuth } from "@/context/authContext";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://geosauer.com/">
        Geo Sauer
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function StickyFooter() {
  const { user } = useAuth();

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
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Copyright />
      </Container>
    </Box>
  );
}
