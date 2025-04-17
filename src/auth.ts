import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { API_HEADERS } from "./lib/constants/headers.constant";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/",
    error: "/",
  },

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        recaptcha: {},
      },
      authorize: async (credentials) => {
        const API_URL = process.env.NEXT_PUBLIC_API;
        const response = await fetch(API_URL + "/api/auth/signin", {
          method: "POST",
          cache: "no-cache",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
            recaptcha: credentials?.recaptcha,
          }),
          headers: {
            ...API_HEADERS,
          },
        });
        const payload: APIResponse<LoginSuccessResponse> = await response.json();

        if ("message" in payload) {
          return {
            id: payload.user.id,
            name: payload.user.name,
            email: payload.user.email,
            phone: payload.user.phone,
            gender: payload.user.gender,
            userType: payload.user.userType,
            token: payload.user.token,
          };
        }
        throw new Error(payload.error);
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.phone = user.phone;
        token.gender = user.gender;
        token.userType = user.userType;
        token.token = user.token;
      }
      return token;
    },

    session: async ({ session, token }) => {
      if (token) {
        session.id = token.id;
        session.name = token.name;
        session.email = token.email;
        session.phone = token.phone;
        session.gender = token.gender;
        session.userType = token.userType;
      }
      return session;
    },
  },
};
