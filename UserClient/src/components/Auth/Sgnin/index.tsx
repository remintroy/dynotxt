import "./style.scss";
import GoogleIcon from "../../../icons/google-logo.png";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authConfig } from "../../../configs/firebase";
import { authBackend } from "../../../configs/axios";
import { fetchUserData, setUser } from "../../../redux/userSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { Alert, Avatar, Box, Button, Container, Input, PasswordInput, Text, rem } from "@mantine/core";
import { IconInfoCircle, IconLock } from "@tabler/icons-react";

export default function SignInComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusDisp, setStatusDisp] = useState({ show: false, message: "", error: false });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginUser = async (type: string) => {
    setStatusDisp({ error: false, message: "Loading...", show: true });
    try {
      const passwordRequiredErrorObj = { code: "auth/Password-is-required" };
      const emailRequiredErrorObj = { code: "auth/Email-is-required" };

      if (type === "email" && !email) throw emailRequiredErrorObj;
      if (type === "email" && !password) throw passwordRequiredErrorObj;
      // logins or crate new user using firebase
      const responseFromFirebase =
        type === "email"
          ? await signInWithEmailAndPassword(authConfig, email, password)
          : await signInWithPopup(authConfig, new GoogleAuthProvider());
      // sends idToken from firebase to server for login
      // console.log(responseFromFirebase);
      const { user } = responseFromFirebase;
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

  const buttonStyle = {
    root: {
      paddingTop: rem(25),
      paddingBottom: rem(25),
    },
    inner: {
      height: "20px",
    },
  };

  return (
    <Container className="Login">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} radius={"xl"} color="indigo" variant="outline">
          <IconLock />
        </Avatar>
        <Text fz={"xl"} fw={700} style={{ marginTop: "10px" }}>
          Sign in to Dynotxt
        </Text>

        <Box
          sx={{
            mt: 3,
            maxWidth: "350px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginTop: "25px",
          }}
        >
          {statusDisp?.show && (
            <Alert icon={<IconInfoCircle />} variant="light" color="cyan">
              {statusDisp?.message}
            </Alert>
          )}
          <Input
            styles={{ input: { padding: "25px" } }}
            placeholder="Email"
            type="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            sx={{
              input: {
                height: "auto",
                paddingLeft: "25px",
              },
            }}
            styles={{ input: { padding: "25px" } }}
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            styles={{
              root: {
                padding: "25px",
              },
              inner: {
                height: "20px",
                transform: "translateY(-10px)",
              },
            }}
            onClick={() => loginUser("email")}
            fullWidth
          >
            Login
          </Button>
          <div style={{ marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link className="link" to="#">
              <Button variant="default"> Forgot password?</Button>
            </Link>
            <Link className="link" to="/auth/signup">
              <Button variant="default">{"Sign Up"}</Button>
            </Link>
          </div>
          <Button
            styles={buttonStyle}
            leftIcon={<img src={GoogleIcon} alt="" />}
            onClick={() => loginUser("")}
            className="google"
            variant="outline"
          >
            Continue with Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
