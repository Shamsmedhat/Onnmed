import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations();

  return (
    <html>
      <body suppressHydrationWarning={true}>
        <main className="h-screen flex items-center justify-center flex-col gap-12">
          {/* Message */}
          <h1 className="text-9xl text-red-500 font-bold">{t("not-found")}</h1>

          {/* Homepage link */}
          <Link href="/">{t("go-back-to-homepage")}</Link>
        </main>
      </body>
    </html>
  );
}
