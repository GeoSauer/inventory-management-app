"use client";

import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useAuth } from "@/context/authContext";

export default function Auth() {
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
          // backgroundImage: 'url("/static/images/templates/templates-images/sign-in-side-bg.png")', //TODO
          // backgroundColor: (t) =>
          //   t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "left",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {error && <Typography color="error">{error}</Typography>}
            <Button
              onClick={returningUser ? onSignIn : onSignUp}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {returningUser ? "Sign In" : "Sign Up"}
            </Button>
            <Grid container>
              {/* //TODO */}
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
              <Grid item>
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => setReturningUser(!returningUser)}
                >
                  {returningUser
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Sign In"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
