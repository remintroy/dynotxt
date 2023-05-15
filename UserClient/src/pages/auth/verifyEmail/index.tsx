import { Alert, Avatar, Box, Button, Container, Flex, Input, LoadingOverlay, Text } from "@mantine/core";
import { useGetVerificationStatusQuery, useVefifyEmailWithOtpMutation } from "../../../lib/api/authApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IconInfoCircle, IconRecordMail } from "@tabler/icons-react";
import { useAppDispatch } from "../../../lib/redux/hooks";
import { setUser } from "../../../lib/redux/userSlice";

const VerfiyEmailPage = () => {
  const { uid } = useParams();
  const [statusDisp, setStatusDisp] = useState({ show: false, message: "", error: false });
  const [statusError, setStatusError] = useState({ show: false, message: "" });
  const { isLoading, isFetching, isError, data } = useGetVerificationStatusQuery({ uid });
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [verifyEmailWithOtp] = useVefifyEmailWithOtpMutation();
  const dispatch = useAppDispatch();

  const submitOtp = async () => {
    //
    try {
      const response = await verifyEmailWithOtp({ uid, otp }).unwrap();
      dispatch(setUser(response));
      navigate("/");
    } catch (error: any) {
      const message = error?.data?.error ? error.data.error : "Error while verifying email";
      setStatusDisp((pre) => ({ ...pre, message, show: true, error: true }));
    }
  };

  useEffect(() => {
    setStatusError((pre) => ({ ...pre, message: "", show: false, error: false }));
    if (data) {
      let errorMessage = "";
      if (data?.status == "VERIFIED") {
        errorMessage = "Email already verified";
        setStatusError((pre) => ({ ...pre, message: errorMessage, show: true, error: true }));
      }
    }
  }, [data]);

  return (
    <div className="VerfyEmail">
      <LoadingOverlay visible={isLoading || isFetching} overlayBlur={2} />

      <Container>
        {(isError || statusError.show) && (
          <Flex
            direction={"column"}
            justify="center"
            align="center"
            gap={20}
            sx={{ position: "absolute", bottom: "0", top: 0, left: 0, right: 0 }}
          >
            <Text size="xl" fw={700}>
              {statusError.message}
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
          {!isLoading && !isError && !statusError.show && (
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

export default VerfiyEmailPage;
