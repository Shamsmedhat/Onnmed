"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

// Page props type
type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  // Translations
  const t = useTranslations();

  return (
    <div>
      {/* Headline */}
      <h1 className="text-9xl font-bold text-red-600">{t("error")}</h1>

      {/* Message */}
      <p>{error.message}</p>

      {/* Try again */}
      <button className="mt-12" onClick={reset}>
        {t("try-again")}
      </button>

      {/* Go to home */}
      <Link className="mt-12 capitalize" href="/">
        {t("go-to-home")}
      </Link>
    </div>
  );
}
