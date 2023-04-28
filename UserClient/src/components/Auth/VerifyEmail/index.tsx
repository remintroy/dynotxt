import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";
import { fetchUserData, setUser } from "../../../redux/userSlice";
import { authBackend } from "../../../configs/axios";
import { Alert, Avatar, Box, Button, Container, Flex, Input, LoadingOverlay, Text } from "@mantine/core";
import { IconInfoCircle, IconRecordMail } from "@tabler/icons-react";

const VerifyEmailComponent = () => {
  const [statusDisp, setStatusDisp] = useState({ show: false, message: "", error: false });
  const [loading, setLoading] = useState(true);
  const [otp, setOtp] = useState("");
  const [showError, setShowError] = useState({ message: "", show: false });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    const getPageData = async () => {
      try {
        const { data } = await authBackend.get(`/verify_email/${params.uid}`);
        if (data.status == "VERIFIED")
          setShowError({
            show: true,
            message: "Your Email is Aleady verified",
          });
        setLoading(false);
      } catch (error: any) {
        if (error?.response?.status === 404) {
          setShowError({
            show: true,
            message: error?.response?.data?.error ? error?.response?.data?.error : "Page not found !",
          });
          setLoading(false);
        } else {
        }
      }
    };
    getPageData();
  }, [setLoading]);

  const submitOtp = async () => {
    try {
      const { data } = await authBackend.post(`/verify_email/${params.uid}`, { otp: otp });
      dispatch(setUser(data));
      setStatusDisp({ show: true, message: "Login success", error: false });
      dispatch(fetchUserData());
      navigate("/");
    } catch (error: any) {
      setStatusDisp({
        show: true,
        error: true,
        message: error?.response?.data?.error ? error?.response?.data?.error : "Failed to verify email",
      });
    }
  };
  return (
    <div className="VerfyEmail">
      <LoadingOverlay visible={loading} overlayBlur={2} />

      <Container>
        {showError.show && (
          <Flex
            direction={"column"}
            justify="center"
            align="center"
            gap={20}
            sx={{ position: "absolute", bottom: "0", top: 0, left: 0, right: 0 }}
          >
            <Text size="xl" fw={700}>
              {showError.message}
            </Text>
            <Button variant="outline" onClick={() => navigate("/")}>
              Go to home page
            </Button>
          </Flex>
        )}
        <Box
          sx={{
            marginTop: 50,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {!loading && !showError.show && (
            <>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <IconRecordMail />
              </Avatar>
              <Text fz={"xl"} fw={700} style={{ marginTop: "20px" }}>
                Check You Email for otp !
              </Text>
              <div className="dim">
                <small>You must verify your email before completing authentication</small>
              </div>
              <Box sx={{ marginTop: 20, maxWidth: "400px", width: "100%", padding: "20px" }}>
                {statusDisp?.show && (
                  <Alert icon={<IconInfoCircle />} sx={{ marginBottom: "15px" }} variant="light" color="cyan">
                    {statusDisp?.message}
                  </Alert>
                )}
                <Input
                  styles={{ input: { padding: "25px" } }}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.toUpperCase().trim())}
                  required
                  name="OTP"
                  autoComplete="off"
                  placeholder="OTP. eg.GPDT45"
                  autoFocus
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
                  fullWidth
                  variant="outline"
                  disabled={otp.length != 6}
                  sx={{ marginTop: 13, mb: 2 }}
                  onClick={() => submitOtp()}
                >
                  Complete Login
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default VerifyEmailComponent;
