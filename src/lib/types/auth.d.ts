import { User } from "next-auth";

declare type SignInResponse = {
  token: string;
  user: User;
};

declare type VerifyOtpResponse = { status: string };

declare type ResetPasswordResponse = {
  message: string;
  token: string;
};

declare type SignUpResponse = {
  token: string;
  user: User;
};

declare type RegisterFields = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
  gender: "male" | "female";
  userType: "admin" | "doctor" | "patient";
};

declare type ForgetPasswordFields = {
  email: string;
};

declare type SetPasswordFields = {
  email: string;
  newPassword: string;
};

declare type VerifyOtpFields = {
  resetCode: string;
};

declare type AuthDialog = "login" | "register";

declare type LoginResponse = User;
