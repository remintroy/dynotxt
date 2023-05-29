import { Alert, Avatar, Box, Button, Container, Input, PasswordInput, Text } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { IconLock } from "@tabler/icons-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import useAuthHook from "../../../hooks/useAuth";
import GoogleLoginButtonComponent from "../../../components/GoogleLoginButton";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [statusDisp, setStatusDisp] = useState({ show: false, error: false, errorMessage: "" });
  const { signupWithEmail, status, loginWithGoogle } = useAuthHook();

  const handleSignup = async () => {
    setStatusDisp((pre) => ({ ...pre, show: true, error: false, errorMessage: "" }));
    await signupWithEmail(email, password, confirm).catch((err) => {
      setStatusDisp((pre) => ({ ...pre, error: true, errorMessage: err }));
    });
  };

  const handleGoogleLogin = async () => {
    setStatusDisp((pre) => ({ ...pre, show: true, error: false, errorMessage: "" }));
    await loginWithGoogle().catch((err) => {
      setStatusDisp((pre) => ({ ...pre, error: true, errorMessage: err }));
    });
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
          Signup to Dynotxt
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
            <Alert icon={<IconInfoCircle />} sx={{ textTransform: "capitalize" }} variant="light" color="cyan">
              {statusDisp.error ? statusDisp.errorMessage : status}
            </Alert>
          )}
          <Input styles={{ input: { padding: "25px" } }} placeholder="Email" type="email" autoFocus value={email} onChange={(e) => setEmail(e.target.value)} />
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
          <PasswordInput
            sx={{
              input: {
                height: "auto",
                paddingLeft: "25px",
              },
            }}
            styles={{ input: { padding: "25px" } }}
            value={confirm}
            placeholder="Confirm Password"
            onChange={(e) => setConfirm(e.target.value)}
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
            onClick={handleSignup}
            fullWidth
          >
            Signup
          </Button>
          <div style={{ marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Link className="link" to="#">
              <Button variant="default"> Forgot password?</Button>
            </Link>
            <Link className="link" to="/auth/signin">
              <Button variant="default">{"Login"}</Button>
            </Link>
          </div>
          <GoogleLoginButtonComponent onClick={handleGoogleLogin} />
        </Box>
      </Box>
    </Container>
  );
};

export default SignUpPage;
