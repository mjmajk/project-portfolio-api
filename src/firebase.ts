import admin from "firebase-admin";
import { GraphQLError } from "graphql";

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/gm, "\n"),
    clientEmail: process.env.CLIENT_EMAIL,
  }),
});

export const verifyToken = (token: string) => {
  return admin
    .auth(app)
    .verifyIdToken(token)
    .then((decodedToken) => {
      console.log(decodedToken);
    })
    .catch((error) => {
      throw new GraphQLError("User is not authenticated", {
        extensions: {
          code: "UNAUTHENTICATED",
          http: { status: 401 },
        },
      });
    });
};
