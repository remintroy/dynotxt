import "./style.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react"; 
import { authConfig } from "../../configs/firebase";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { setUser } from "../../redux/userSlice";
import { authBackend } from "../../configs/axios";
import { Alert, Checkbox, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
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

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPsw, setShowPsw] = useState(false);
  const [statusDisp, setStatusDisp] = useState({ show: false, message: "", error: false });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginUser = async (type: string) => {
    setStatusDisp({ error: false, message: "Loading...", show: true });
    try {
      const error = { code: "auth/Confirm-Password-Dosen't-match" };
      const error2 = { code: "auth/Password-is-required" };
      const error3 = { code: "auth/Email-is-required" };

      if (type === "email" && !email) throw error3;
      if (type === "email" && !password) throw error2;
      if (type === "email" && password !== confirm) throw error;

      // logins or crate new user using firebase
      const response =
        type === "email"
          ? await createUserWithEmailAndPassword(authConfig, email, password)
          : await signInWithPopup(authConfig, new GoogleAuthProvider());
      // sends idToken from firebase to server for login
      // console.log(response);
      const { user } = response;
      const idToken = await user.getIdToken();
      const { data } = await authBackend.post("/signin", { idToken });
      // saving tokens
      dispatch(setUser(data));
      setStatusDisp({ show: true, message: "Login success", error: false });
      navigate("/");
      //..
    } catch (error: any) {
      setStatusDisp({
        show: true,
        error: true,
        message: error?.code ? error?.code.split("/").pop().split("-").join(" ") : "Faild to login plz try after some time",
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
          Create account in Dynotxt
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
            fullWidth
            name="password"
            label="Password"
            type={showPsw ? "text" : "password"}
            autoComplete="current-password"
          />
          <TextField
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            margin="normal"
            fullWidth
            name="confirm-password"
            label="Confirm Password"
            type={showPsw ? "text" : "password"}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox checked={showPsw} onChange={(e) => setShowPsw(e.target.checked)} color="primary" />}
            label="Show password"
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
              <Link href="/auth/login" variant="body2">
                {"Already have an account? Login"}
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
