"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { useAuth } from "@/context/AuthContext";

function Copyright() {
  return (
    <Typography variant="body2" color="lightgray">
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
        py: 2,
        position: "fixed",
        bottom: 0,
        zIndex: 1,
        width: "100%",
        backdropFilter: "blur(10px)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
      }}
    >
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Copyright />
      </Container>
    </Box>
  );
}
