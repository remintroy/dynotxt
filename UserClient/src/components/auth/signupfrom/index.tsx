import { Button, Input, PasswordInput } from "@mantine/core";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../lib/redux/hooks";
import { useSigninMutation } from "../../../lib/api/authApi";
import { logout, setUser } from "../../../lib/redux/userSlice";
import { authConfig } from "../../../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUpFromComponent = ({ setStatus }: any) => {
  const [{ email, password, confirm }, setData] = useState({ email: "", password: "", confirm: "" });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [signIn] = useSigninMutation();

  const signInUser = async () => {
    if (setStatus) setStatus({ error: false, message: "Loading...", show: true });
    try {
      if (!email) throw { code: "auth/Password-is-required" };
      if (!password) throw { code: "auth/Email-is-required" };
      if (!confirm) throw { code: "auth/Confirm-is-required" };
      if (confirm !== password) throw { code: "auth/Confirm-dosent-required" };

      // logins or crate new user using firebase
      const responseFromFirebase = await createUserWithEmailAndPassword(authConfig, email, password);
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
        onChange={(e) => setData((pre) => ({ ...pre, confirm: e.target.value }))}
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
        onClick={() => signInUser()}
        fullWidth
      >
        Login
      </Button>
      <div style={{ marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link className="link" to="#">
          <Button variant="default"> Forgot password?</Button>
        </Link>
        <Link className="link" to="/auth/signin">
          <Button variant="default">{"Login"}</Button>
        </Link>
      </div>
    </>
  );
};

export default SignUpFromComponent;
