import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId:
        "753918053318-kq1klecefddohgrt4h5goc2tgjqd6ndp.apps.googleusercontent.com",
      clientSecret: "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",
      idToken: true,
      authorization: {
        url: "https://accounts.google.com/o/oauth2/v2/auth",
        params: {
          prompt: "select_account",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),

    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      if (user) {
        session.accessToken = token.accessToken;
        return session;
      }
    },
  },
};

export default NextAuth(authOptions);
