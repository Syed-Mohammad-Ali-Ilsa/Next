// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  browserSessionPersistence,
  browserPopupRedirectResolver,
} from "firebase/auth";
import { setUserCookie } from "../lib/userCookies";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKDdWGrzYt5Bb1iYvma96vtRG6yEpq_34",
  authDomain: "next-92a64.firebaseapp.com",
  projectId: "next-92a64",
  storageBucket: "next-92a64.appspot.com",
  messagingSenderId: "753918053318",
  appId: "1:753918053318:web:113600aa6dbb589e7440c7",
  measurementId: "G-PYPNQ5Y9FW",
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig, "user");
export const auth = getAuth(app, {
  persistence: browserSessionPersistence,
  popupRedirectResolver: browserPopupRedirectResolver,
});

export const currentUser = auth.currentUser;

export const signUp = async (email, password) => {
  const u = await createUserWithEmailAndPassword(auth, email, password)
    .then(async (userCredential) => {
      // Signed in
      const user = await userCredential.user.accessToken;
      setUserCookie(JSON.stringify(user));
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  console.log(u);
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
});
// const analytics = getAnalytics(app);
