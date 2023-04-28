import "./style.scss";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authConfig } from "../../configs/firebase";
import { authBackend } from "../../configs/axios";
import { fetchUserData, setUser } from "../../redux/userSlice";
import { useAppDispatch } from "../../redux/hooks";

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://dynotxt.com/">
        Dynotxt
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusDisp, setStatusDisp] = useState({ show: false, message: "", error: false });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginUser = async (type: string) => {
    setStatusDisp({ error: false, message: "Loading...", show: true });
    try {
      const error2 = { code: "auth/Password-is-required" };
      const error3 = { code: "auth/Email-is-required" };

      if (type === "email" && !email) throw error3;
      if (type === "email" && !password) throw error2;
      // logins or crate new user using firebase
      const response =
        type === "email"
          ? await signInWithEmailAndPassword(authConfig, email, password)
          : await signInWithPopup(authConfig, new GoogleAuthProvider());
      // sends idToken from firebase to server for login
      // console.log(response);
      const { user } = response;
      const idToken = await user.getIdToken();
      try {
        const { data } = await authBackend.post("/signin", { idToken });
        // saving tokens
        dispatch(setUser(data));
        setStatusDisp({ show: true, message: "Login success", error: false });

        dispatch(fetchUserData());

        navigate("/");
      } catch (error: any) {
        //
        if (error?.response?.status == 403 && error.response?.data?.action === "VRFYMIL")
          navigate(`/auth/verify-email/${user.uid}`);

        const errorObj = {
          code: error?.response?.data?.error
            ? `authServer/${error.response.data.error?.split(" ")?.join("-")}`
            : "Failed to login your plz try after some time",
        };
        throw errorObj;
      }
      //..
    } catch (error: any) {
      setStatusDisp({
        show: true,
        error: true,
        message: error?.code ? error?.code.split("/").pop().split("-").join(" ") : "Failed to login plz try after some time",
      });
    }
  };

  return (
    <Container className="Login" component="main" maxWidth="xs" style={{ color: "white" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{ marginTop: "10px" }}>
          Sign in to Dynotxt
        </Typography>

        <Box sx={{ mt: 3 }}>
          {statusDisp?.show && (
            <Alert className="disp" color="info" variant="outlined" severity={`${statusDisp?.error ? "error" : "success"}`}>
              {statusDisp?.message}
            </Alert>
          )}
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            onClick={() => loginUser("email")}
            fullWidth
            variant="contained"
            style={{ padding: "10px 0" }}
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/auth/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>

          <Button onClick={() => loginUser("")} className="google" variant="outlined">
            <img src="/icons/google-logo.png" alt="" />
            Continue with Google
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
