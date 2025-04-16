import ReCaptchaProvider from "./components/google-recaptcha-provider";
import NextAuthProvider from "./components/next-auth.provider";
import NextIntlProvider from "./components/next-intl.provider";
import ReactQueryProvider from "./components/react-query.provider";

type PageProps = {
  children: React.ReactNode;
};
export default function Providers({ children }: PageProps) {
  return (
    <ReactQueryProvider>
      <ReCaptchaProvider>
        <NextIntlProvider>
          <NextAuthProvider>{children}</NextAuthProvider>
        </NextIntlProvider>
      </ReCaptchaProvider>
    </ReactQueryProvider>
  );
}
