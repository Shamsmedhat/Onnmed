"use client";

import LoginSkeleton from "@/components/skeletons/login.skeleton";
import RegisterSkeleton from "@/components/skeletons/register.skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeAuthForm } from "@/lib/constants/auth-form.constant";
import { useSession } from "next-auth/react";

import { useLocale, useTranslations } from "next-intl";
import dynamic from "next/dynamic";
import { useState } from "react";
const LoginForm = dynamic(() => import("./login-form"), {
  ssr: false,
  loading: () => <LoginSkeleton />,
});
const RegisterForm = dynamic(() => import("./register-form"), {
  ssr: false,
  loading: () => <RegisterSkeleton />,
});

export default function AuthDialog() {
  // Translation
  const t = useTranslations();
  const locale = useLocale();

  // Session
  const session = useSession();
  const patientUser = session.data?.userType === "patient";
  const guesttUser = session.status === "unauthenticated";

  // State
  const [formName, setFormName] = useState<ChangeAuthForm>(ChangeAuthForm.LOGIN);
  const [open, setOpen] = useState(false);

  console.log("form name", formName);
  // Functions
  function changeForm(formName: ChangeAuthForm) {
    setFormName(formName);
  }

  function closeDialog(open: boolean) {
    setOpen(!open);

    // Prevent showing the login form before dialog fully close immediately
    setTimeout(() => {
      setFormName(ChangeAuthForm.LOGIN);
    }, 500);
  }

  return (
    <Dialog onOpenChange={(open) => closeDialog(open)} defaultOpen={open}>
      {/* Login button */}
      <DialogTrigger asChild>
        <Button variant="default" className="rounded-3xl capitalize">
          {t("login")}
        </Button>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent className="sm:max-w-[425px]" dir={locale === "ar" ? "rtl" : "ltr"}>
        {formName === "login" && (
          <>
            {/* Dialog header */}
            <DialogHeader>
              <DialogTitle className="text-3xl font-normal capitalize">
                {t("login-to-your-account")}
              </DialogTitle>
            </DialogHeader>
            <LoginForm changeForm={changeForm} />
          </>
        )}

        {(patientUser || guesttUser) && formName === "register" && (
          <>
            {/* Dialog header */}
            <DialogHeader>
              <DialogTitle className="text-3xl font-normal capitalize">
                {t("create-account")}
              </DialogTitle>
            </DialogHeader>
            <RegisterForm changeForm={changeForm} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
