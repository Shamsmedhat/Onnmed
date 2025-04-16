"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useTranslations } from "next-intl";
import { ChangeAuthForm } from "@/lib/constants/auth-form.constant";
import { signIn, useSession } from "next-auth/react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { toast } from "sonner";

// Type
type LoginFormProps = {
  changeForm: (formName: ChangeAuthForm) => void;
};

export default function LoginForm({ changeForm }: LoginFormProps) {
  // Translation
  const t = useTranslations();

  // Session
  const session = useSession();
  const patientUser = session.data?.userType === "patient";
  const guestUser = session.status === "unauthenticated";

  // State
  const [captchaError, setCaptchaError] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  // Hooks
  const { executeRecaptcha } = useGoogleReCaptcha();

  // Schema
  const LoginFormSchema = z.object({
    email: z.string().email().min(5, { message: "Email must be at least 5 characters." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  });
  type Inputs = z.infer<typeof LoginFormSchema>;

  // Form
  const form = useForm<Inputs>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { errors, isSubmitting, isDirty, isLoading } = form.formState;

  // Function
  const onSubmit = async (values: z.infer<typeof LoginFormSchema>) => {
    try {
      if (!executeRecaptcha) {
        console.error("Execute recaptcha not available");
        setCaptchaError(true);
        return;
      }

      const captchaToken = await executeRecaptcha("login");

      if (!captchaToken) {
        setCaptchaError(true);
        return;
      }

      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        recaptcha: captchaToken,
        redirect: false,
      });
      if (response?.status === 401) {
        setError(t("wrong-email-or-password"));
        return;
      }

      if (response?.ok) {
        localStorage.removeItem("guestAppointment");
        window.location.href = "/";
        toast.success(t("logged-in-successfully"));
      }
    } catch (error) {
      setError((error as Error).message);
      setCaptchaError(true);
    }
  };

  return (
    <Form {...form}>
      {/* Dialog Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel className="sr-only">{t("email")}</FormLabel>
              <FormControl>
                {/* Input */}
                <Input placeholder={t("email")} className="rounded-xl " {...field} />
              </FormControl>

              {/* Message */}
              <FormMessage>{errors.email?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              {/* Label */}
              <FormLabel className="sr-only">{t("password")}</FormLabel>
              <FormControl>
                {/* Input */}
                <Input
                  placeholder={t("password")}
                  type="password"
                  className="rounded-xl "
                  {...field}
                />
              </FormControl>
              {/* Message */}
              <FormMessage>{errors.password?.message}</FormMessage>
            </FormItem>
          )}
        />

        {/* Login footer */}
        <DialogFooter>
          <div className="flex w-full flex-col">
            {/* Register and submit btn*/}
            <div className="flex w-full flex-col text-xs capitalize">
              {/* No account (register) */}
              {(guestUser || patientUser) && (
                <div className="mr-auto space-x-1 my-2">
                  <span>{t("no-account")}</span>
                  <button
                    type="button"
                    className="border-none bg-transparent capitalize text-custom-rose-900 underline "
                    onClick={() => changeForm(ChangeAuthForm.REGISTER)}
                  >
                    {t("create-one-here")}
                  </button>
                </div>
              )}

              {/* Submit */}
              {captchaError && <p className="text-red-600 mb-2">{captchaError}</p>}
              <p className="text-red-600 mb-2">{error}</p>
              <Button
                type="submit"
                className="capitalize"
                disabled={isSubmitting || !isDirty || isLoading}
              >
                {isSubmitting || isLoading ? t("submiting") : t("submit")}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
}
