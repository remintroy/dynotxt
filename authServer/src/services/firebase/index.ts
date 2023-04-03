import { initializeApp, applicationDefault } from "firebase-admin/app";

export const firebaseInit = () => {
  initializeApp({
    credential: applicationDefault(),
  });
};
