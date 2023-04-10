import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDveoFCTRCYuz3BvbYdq1kT0OB2CKIc8XM",
  authDomain: "dynotxt.firebaseapp.com",
  projectId: "dynotxt",
  storageBucket: "dynotxt.appspot.com",
  messagingSenderId: "127636957223",
  appId: "1:127636957223:web:b2e059a720af8bb97ec602",
  measurementId: "G-TLH30P3FKG",
};

// Initialize Firebase
export const appConfig = initializeApp(firebaseConfig);
export const authConfig = getAuth(appConfig);
export const storageConfig = getStorage(appConfig);
export const analyticsConfig = getAnalytics(appConfig);
