"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

type NextAuthProviderProps = {
  children: React.ReactNode;
};
export default function ReCaptchaProvider({ children }: NextAuthProviderProps) {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
      {children}
    </GoogleReCaptchaProvider>
  );
}
