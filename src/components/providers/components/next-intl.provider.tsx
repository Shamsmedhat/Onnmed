import { NextIntlClientProvider, useMessages } from "next-intl";
import React from "react";

type PageProps = {
  children: React.ReactNode;
};
export default function NextIntlProvider({ children }: PageProps) {
  // Translation
  const messages = useMessages();
  return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>;
}
