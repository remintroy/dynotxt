import { Alert, Avatar, Backdrop, Box, Button, CircularProgress, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authBackend } from "../../configs/axios";
import EmailIcon from "@mui/icons-material/Email";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/userSlice";
import "./style.scss"

const VerfyEmail = () => {
  const [statusDisp, setStatusDisp] = useState({ show: false, message: "", error: false });
  const [loading, setLoading] = useState(true);
  const [otp, setOtp] = useState("");
  const [is404, setIs404] = useState({ message: "", show: false });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();

  useEffect(() => {
    const getPageData = async () => {
      try {
        const { data } = await authBackend.get(`/verify_email_page/${params.uid}`);
        console.log(data);
        setLoading(false);
      } catch (error: any) {
        if (error?.response?.status === 404) {
          setIs404({
            show: true,
            message: error?.response?.data?.error ? error?.response?.data?.error : "Page not found",
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
      const { data } = await authBackend.post("/verify_email", { uid: params.uid, otp: otp });
      dispatch(setUser(data));
      setStatusDisp({ show: true, message: "Login success", error: false });
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
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container component="main" maxWidth="xs" style={{ color: "white" }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {is404.show && (
            <>
              <h1>404</h1>
              <div className="dim">{is404.message}</div> <br />
              <Button variant="contained" onClick={() => navigate("/")}>
                Go to home page
              </Button>
            </>
          )}
          {!loading && !is404.show && (
            <>
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <EmailIcon />
              </Avatar>
              <Typography component="h1" variant="h5" style={{ marginTop: "10px", marginBottom: "8px" }}>
                Check You Email for otp !
              </Typography>
              <div className="dim">
                <small>You must verify your email before completing authentication</small>
              </div>
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
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.toUpperCase().trim())}
                  margin="normal"
                  required
                  fullWidth
                  label="OTP"
                  name="OTP"
                  autoComplete="off"
                  autoFocus
                />
                <Button
                  fullWidth
                  variant="contained"
                  disabled={otp.length != 6}
                  style={{ padding: "10px 0" }}
                  sx={{ mt: 3, mb: 2 }}
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

export default VerfyEmail;
