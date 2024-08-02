"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
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
import { useRouter } from "next/navigation";
import Link from "next/link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [authFlow, setAuthFlow] = useState("sign-up");

  const router = useRouter();

  const makeErrorMessagesReadable = (message) => {
    const start = message.indexOf("(") + 1;
    const end = message.indexOf(")");
    let hyphenatedPart = message.slice(start, end);

    if (hyphenatedPart.startsWith("auth/")) {
      hyphenatedPart = hyphenatedPart.replace("auth/", "").replace(/-/g, " ");
    }
    return hyphenatedPart;
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      setError(makeErrorMessagesReadable(error.message));
    }
  };

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (error) {
      setError(makeErrorMessagesReadable(error.message));
    }
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
            {authFlow === "sign-up" ? "Sign Up" : "Sign In"}
          </Typography>
          <Box
            component="form"
            noValidate
            // onSubmit={authFlow === "sign-up" ? handleSignUp : handleSignIn}
            sx={{ mt: 1 }}
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
              onClick={authFlow === "sign-up" ? handleSignUp : handleSignIn}
              // type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {authFlow === "sign-up" ? "Sign Up" : "Sign In"}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => setAuthFlow(authFlow === "sign-up" ? "sign-in" : "sign-up")}
                >
                  {authFlow === "sign-up"
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
    </Grid>
    ////////////////////////
    // <Box sx={{ width: 600, margin: "auto", padding: 2, backgroundColor: "white" }}>
    //   <Typography variant="h5" color={"black"}>
    // {authFlow === "sign-up" ? "Sign Up" : "Sign In"}
    //   </Typography>
    //   <TextField
    //     fullWidth
    //     label="Email"
    //     type="email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     margin="normal"
    //   />
    //   <TextField
    //     fullWidth
    //     label="Password"
    //     type="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     margin="normal"
    //   />
    // {error && <Typography color="error">{error}</Typography>}
    //   <Button
    //     variant="contained"
    //     onClick={authFlow === "sign-up" ? handleSignUp : handleSignIn}
    //     sx={{ marginTop: 2 }}
    //   >
    // {authFlow === "sign-up" ? "Sign Up" : "Sign In"}
    //   </Button>
    //   <Stack direction={"row"}>
    //     <Typography component={"span"} color={"black"}>
    //       {authFlow === "sign-up"
    //         ? "Already have an account? Log in "
    //         : "Need an account? Create one"}{" "}
    //     </Typography>
    //     <Typography
    //       color={"black"}
    //       onClick={() => setAuthFlow(authFlow === "sign-up" ? "sign-in" : "sign-up")}
    //     >
    //       here
    //     </Typography>
    //   </Stack>
    // </Box>
  );
}
