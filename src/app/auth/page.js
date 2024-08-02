"use client";

import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "@/context/authContext";

export default function Auth() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [returningUser, setReturningUser] = useState(true);

  const { handleSignIn, handleSignUp, error } = useAuth();

  const onSignUp = () => {
    handleSignUp(email, password);
  };

  const onSignIn = () => {
    handleSignIn(email, password);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url("/images/pantry_vertical.jpeg")',
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{ backgroundColor: "lightgray" }}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {returningUser ? "Sign In" : "Sign Up"}
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1, display: "flex", flexDirection: "column", width: "100%" }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              bgcolor="white"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              onClick={returningUser ? onSignIn : onSignUp}
              fullWidth
              variant="contained"
              color="secondary"
              sx={{
                mt: 3,
                mb: 2,
                padding: isMobile ? "0.5rem 1rem" : "1rem 2rem",
                width: "auto",
                alignSelf: "center",
                borderRadius: "50px",
              }}
            >
              {returningUser ? "Sign In" : "Sign Up"}
            </Button>
            <Typography
              sx={{ cursor: "pointer", textAlign: "center" }}
              onClick={() => setReturningUser(!returningUser)}
            >
              {returningUser
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
