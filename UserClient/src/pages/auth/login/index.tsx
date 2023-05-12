import { Alert, Avatar, Box, Container, Text } from "@mantine/core";
import { IconInfoCircle, IconLock } from "@tabler/icons-react";
import LoginFromComponent from "../../../components/auth/loginform";
import GoogleLoginButtonComponent from "../../../components/auth/googleLoginButton";
import { useState } from "react";

const LoginPage = () => {
  const [statusDisp, setStatusDisp] = useState({ show: false, message: "", error: false });

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
          <LoginFromComponent setStatus={setStatusDisp} />
          <GoogleLoginButtonComponent setStatus={setStatusDisp} />
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
