import { Button, rem } from "@mantine/core";
import GoogleIcon from "../../../assets/google-logo.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authConfig } from "../../../lib/firebase";
import { useSigninMutation } from "../../../lib/api/authApi";
import { useAppDispatch } from "../../../lib/redux/hooks";
import { logout, setUser } from "../../../lib/redux/userSlice";
import "./style.scss";
import { useNavigate } from "react-router-dom";

const GoogleLoginButtonComponent = ({ setStatus }: { setStatus?: any }) => {
  const buttonStyle = {
    root: {
      paddingTop: rem(25),
      paddingBottom: rem(25),
    },
    inner: {
      height: "20px",
    },
  };

  const [signIn] = useSigninMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginHandler = async () => {
    if (setStatus) setStatus({ show: true, message: "Loading...", error: false });
    try {
      const responseFromFirebase = await signInWithPopup(authConfig, new GoogleAuthProvider());
      const { user } = responseFromFirebase;
      const idToken = await user.getIdToken();
      const response = await signIn({ idToken }).unwrap();
      dispatch(logout());
      dispatch(setUser(response));
      if (setStatus) setStatus({ show: true, message: "Login success", error: false });
      navigate("/");
    } catch (error: any) {
      const message = error?.code
        ? error?.code.split("/").pop().split("-").join(" ")
        : "Failed to login plz try after some time";
      if (setStatus) setStatus({ show: true, message, error: true });
    }
  };

  return (
    <Button
      styles={buttonStyle}
      leftIcon={<img src={GoogleIcon} alt="" />}
      onClick={() => loginHandler()}
      className="google"
      variant="outline"
    >
      Continue with Google
    </Button>
  );
};

export default GoogleLoginButtonComponent;
