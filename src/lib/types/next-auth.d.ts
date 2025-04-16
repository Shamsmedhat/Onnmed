/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: "male" | "female";
    userType: "admin" | "doctor" | "patient";
  }

  interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: "male" | "female";
    userType: "admin" | "doctor" | "patient";
    token: string;
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    id: string;
    name: string;
    email: string;
    phone: string;
    gender: "male" | "female";
    userType: "admin" | "doctor" | "patient";
    token: string;
  }
}
