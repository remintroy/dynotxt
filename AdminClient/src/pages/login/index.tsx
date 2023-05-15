import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../lib/redux/userSlice";
import { useTheme } from "@emotion/react";
import { useLoginMutation } from "../../lib/api/authApi";

export default function SignIn() {
  const [loginApi] = useLoginMutation();

  const theme: any = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusDisp, setStatusDisp] = useState({ show: false, message: "", error: false });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = async (type: string) => {
    setStatusDisp({ error: false, message: "Loading...", show: true });
    try {
      const error2 = { code: "Password is required" };
      const error3 = { code: "Email is required" };

      if (type === "email" && !email) throw error3;
      if (type === "email" && !password) throw error2;
      // logins or crate new user using firebase

      const data = await loginApi({ email, password }).unwrap();
      // saving tokens
      dispatch(setUser(data));
      setStatusDisp({ show: true, message: "Login success", error: false });
      navigate("/");
      //..
    } catch (error: any) {
      setStatusDisp({
        show: true,
        error: true,
        message: error?.response?.data?.error ? error?.response?.data?.error : "Faild to login plz try after some time",
      });
    }
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <Container className="Login" component="main" maxWidth="xs">
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
            Sign in to Dynotxt Admin Dashboard
          </Typography>

          <Box sx={{ mt: 3 }}>
            {statusDisp?.show && (
              <Alert
                className="disp"
                color="info"
                variant="outlined"
                severity={`${statusDisp?.error ? "error" : "success"}`}
              >
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
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
