import * as firebaseAdmin from "firebase-admin";
import { removeUserCookie } from "../lib/userCookies";

import serviceAccount from "./serviceAccountCredentials.json";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
  });
}

export function authenticateUser(user){

  let userToken;
  console.log("user: ", user);
  try {
    user = JSON.parse(user);
  } catch (e) {
    user = "";
    removeUserCookie();
  }
  

  return userToken = user !== null
    ? firebaseAdmin
        .auth()
        .verifyIdToken(user)
        .then(function(decodedToken) {
          return decodedToken.uid;
          // ...
        })
        .catch((error) => {
          // Handle error
          removeUserCookie();
          return "";
        })
    : "";
};
