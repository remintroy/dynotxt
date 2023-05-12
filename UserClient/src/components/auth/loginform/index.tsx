import { Button, Input, PasswordInput } from "@mantine/core";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authConfig } from "../../../lib/firebase";
import { useAppDispatch } from "../../../lib/redux/hooks";
import { logout, setUser } from "../../../lib/redux/userSlice";
import { useSigninMutation } from "../../../lib/api/authApi";

const LoginFromComponent = ({ setStatus }: { setStatus?: any }) => {
  const [{ email, password }, setData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signIn] = useSigninMutation();

  const loginUser = async () => {
    if (setStatus) setStatus({ error: false, message: "Loading...", show: true });
    try {
      if (!email) throw { code: "auth/Password-is-required" };
      if (!password) throw { code: "auth/Email-is-required" };

      // logins or crate new user using firebase
      const responseFromFirebase = await signInWithEmailAndPassword(authConfig, email, password);
      // sends idToken from firebase to server for login
      // console.log(responseFromFirebase);
      const { user } = responseFromFirebase;
      const idToken = await user.getIdToken();
      try {
        const response = await signIn({ idToken }).unwrap();
        dispatch(logout());
        dispatch(setUser(response));
        if (setStatus) setStatus({ show: true, message: "Login success", error: false });
        navigate("/");
      } catch (error: any) {
        //
        if (error?.status == 403 && error?.data?.action === "VRFYMIL") navigate(`/auth/verify-email/${user.uid}`);
        const errorObj = {
          code: error?.response?.data?.error
            ? `authServer/${error.response.data.error?.split(" ")?.join("-")}`
            : "Failed to login your plz try after some time",
        };
        throw errorObj;
      }
      //..
    } catch (error: any) {
      if (setStatus)
        setStatus({
          show: true,
          error: true,
          message: error?.code
            ? error?.code.split("/").pop().split("-").join(" ")
            : "Failed to login plz try after some time",
        });
    }
  };

  return (
    <>
      <Input
        styles={{ input: { padding: "25px" } }}
        placeholder="Email"
        type="email"
        autoFocus
        value={email}
        onChange={(e) => setData((pre) => ({ ...pre, email: e.target.value }))}
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
        onChange={(e) => setData((pre) => ({ ...pre, password: e.target.value }))}
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
        onClick={() => loginUser()}
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
    </>
  );
};

export default LoginFromComponent;
