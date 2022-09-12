import * as firebaseAdmin from "firebase-admin";

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

export const authenticateUser = (user) => {
  console.log("mohad: ", user);
  firebaseAdmin
    .auth()
    .verifyIdToken(user)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      console.log("User Authenticated");
      // ...
    })
    .catch((error) => {
      // Handle error
      console.log("Authentication Failed");
    });
};
