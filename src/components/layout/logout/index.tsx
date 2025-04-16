"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export default function Logout() {
  // Translation
  const t = useTranslations();

  return (
    <Button
      onClick={() => signOut({ redirect: false, callbackUrl: "/" })}
      className="bg-red-500 capitalize hover:bg-red-500/70"
    >
      {t("logout")}
    </Button>
  );
}
