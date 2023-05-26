import GetUtils from "dynotxt-common-services/build/utils";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const utilsService = new GetUtils();

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
    throw utilsService.createError(400, error.code?.split("/")[1]?.split("-")?.join(" "));
  }
};
