import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { utilServiceImpl } from "../commonServices";

export const initializeFirebase = () => {
  initializeApp({
    credential: applicationDefault(),
  });
};

// verify idToken and return user data
export const verifyIdToken = async (idToken: string) => {
  try {
    // gets uid from idToken
    const { uid } = await getAuth().verifyIdToken(idToken);
    // gets userData from uid and return it
    return await getAuth().getUser(uid);
  } catch (error) {
    // error handling
    throw utilServiceImpl.createError(
      400,
      error.code?.split("/")[1]?.split("-")?.join(" ")
    );
  }
};
