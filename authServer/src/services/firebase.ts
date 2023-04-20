import { initializeApp, applicationDefault } from "firebase-admin/app";

export const firebaseInit = () => {
  initializeApp({
    credential: applicationDefault(),
  });
};

import { getAuth } from "firebase-admin/auth";
import { createError } from "dynotxt-common-services/utils/";

// verify idToken and return user data
export const verifyIdToken = async ({ idToken }: { idToken: string }) => {
  try {
    // gets uid from idToken
    const uid = (await getAuth().verifyIdToken(idToken)).uid;
    // gets userData from uid and return it
    return await getAuth().getUser(uid);
  } catch (error) {
    // error handling
    throw createError(400, error.code?.split("/")[1]?.split("-")?.join(" "));
  }
};