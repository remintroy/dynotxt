import { GoogleAuthProvider, UserCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { authConfig } from "../lib/firebase";
import { useLogOutMutation, useSigninMutation } from "../lib/api/authApi";
import { resetUserData, setUser } from "../lib/redux/slices/user";
import { useAppDispatch } from "../lib/redux/hooks";
import { useState } from "react";

const reThrowFirebaseError = (err: any) => {
  throw err?.code.split("/").pop().split("-").join(" ");
};

const useAuthHook = () => {
  const [status, setStatus] = useState("");
  const dispatch = useAppDispatch();
  const [signInApi] = useSigninMutation();
  const [logoutApi] = useLogOutMutation();

  const signInUser = async (responseFromFirebase: UserCredential) => {
    setStatus("Loading...");

    // getting idToken from firebase userCredential reponse object
    const idToken = await responseFromFirebase.user.getIdToken().catch(reThrowFirebaseError);
    setStatus("Connecting to server");

    // sending idToken to backend
    const data = await signInApi(idToken)
      .unwrap()
      .catch((err) => {
        throw err?.data.error ?? "Oops someting went wrong";
      });

    // reset userData to null and adding new user data to redux
    dispatch(resetUserData());
    dispatch(setUser(data));
    setStatus("Login success");
    //...
    return data;
  };

  const loginWithGoogle = async () => {
    setStatus("Opening popup");
    // opening google login popoup
    const responseFromFirebase = await signInWithPopup(authConfig, new GoogleAuthProvider()).catch(reThrowFirebaseError);
    return await signInUser(responseFromFirebase);
  };

  const signinWithEmail = async (email: string, password: string) => {
    if (email.trim().length == 0) throw "Email is required";
    if (email.trim().length < 2) throw "Enter a valid email";
    if (password.trim().length == 0) throw "Password required";
    if (password.trim().length < 6) throw "Password must be at least 6 characters";

    //
    setStatus("Checking credentials");

    // submitting credentials to firebase for authentication
    const responseFromFirebase = await signInWithEmailAndPassword(authConfig, email, password).catch(reThrowFirebaseError);
    return await signInUser(responseFromFirebase);
  };

  const signupWithEmail = async (email: string, password: string, confirm: string) => {
    if (email.trim().length == 0) throw "Email is required";
    if (email.trim().length < 2) throw "Enter a valid email";
    if (password.trim().length == 0) throw "Password required";
    if (password.trim().length < 6) throw "Password must be at least 6 characters";
    if (password !== confirm) throw "Confirm password dosen't match";

    //
    setStatus("Checking credentials");

    // submitting credentials to firebase for authentication
    const responseFromFirebase = await createUserWithEmailAndPassword(authConfig, email, password).catch(reThrowFirebaseError);
    return await signInUser(responseFromFirebase);
  };

  const logout = async () => {
    // sending logout request to server
    await logoutApi({});
    // clearing userdata from loredux
    dispatch(resetUserData());
    return true;
  };

  return {
    loginWithGoogle,
    signinWithEmail,
    signupWithEmail,
    logout,
    status,
  };
};

export default useAuthHook;
