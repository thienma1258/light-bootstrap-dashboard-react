import { initializeApp } from "@firebase/app";
console.log(process.env.REACT_APP_FIREBASE_SECRET);
const FIREBASE_CLIENT_CONFIG = process.env.REACT_APP_FIREBASE_SECRET;

if (process.browser) {
  console.log("initializeApp firebase app");
  initializeApp(FIREBASE_CLIENT_CONFIG);
  // runFCMWorker();
}
