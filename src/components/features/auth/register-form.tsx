"use client";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { z } from "zod";
import useRegister from "@/hooks/auth/use-register";
import { ChangeAuthForm } from "@/lib/constants/auth-form.constant";

export default function RegisterForm({
  changeForm,
}: {
  changeForm: (formName: ChangeAuthForm) => void;
}) {
  // Translation
  const t = useTranslations();

  // Variables
  const genders = ["male", "female"] as const;
  const userTypes = ["admin", "doctor", "patient"] as const;

  // Mutation
  const { isPending, error, register } = useRegister();

  // Schema
  const registerSchema = z
    .object({
      name: z
        .string({ required_error: t("first-name-is-required") })
        .min(2, t("first-name-min"))
        .max(30, t("first-name-max")),
      email: z.string({ required_error: t("email-required") }).email(t("email-valid")),
      password: z
        .string({ required_error: t("password-required") })
        .min(8, t("password-min"))
        .regex(
          /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
          t("password-validation")
        ),
      rePassword: z.string({ required_error: t("confirm-password-is-required") }),
      phone: z
        .string({ required_error: t("phone-is-required") })
        .regex(/^01[0125]\d{8}$/, t("phone-validation")),
      gender: z.enum(genders, {
        required_error: t("gender-is-required"),
      }),
      userType: z.enum(userTypes, {
        required_error: t("user-type-is-required"),
      }),
    })
    .refine((data) => data.password === data.rePassword, {
      message: t("passwords-do-not-match"),
      path: ["rePassword"],
    });

  type RegisterSchema = z.infer<typeof registerSchema>;

  const form = useForm<RegisterSchema>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      gender: undefined,
      userType: "patient",
    },
    resolver: zodResolver(registerSchema),
  });

  // Functions
  async function onSubmit(data: RegisterSchema) {
    register(data, {
      onSuccess: () => {
        changeForm(ChangeAuthForm.LOGIN);
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Form */}
        <div className="rounded-xl">
          <div className="flex flex-col gap-[10px]">
            {/* First name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="sr-only">{t("name")}</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      placeholder={t("name")}
                      {...field}
                      className="shadow-sm rounded-xl p-2 h-[48px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone number */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="sr-only">{t("phone-number")}</FormLabel>
                  <FormControl>
                    {/* Input */}
                    <Input
                      {...field}
                      type="tel"
                      placeholder={t("phone-number")}
                      className="shadow-sm rounded-xl mt-0 px-1 py-2 h-[48px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="sr-only">{t("email")}</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      placeholder={t("email")}
                      className="shadow-sm rounded-xl p-2 h-[48px]"
                    />
                  </FormControl>
                  <FormMessage />
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

                  {/* Input */}
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={t("password")}
                      className="shadow-sm rounded-xl p-2 h-[48px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm password */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="sr-only">{t("confirm-password")}</FormLabel>

                  {/* Input */}
                  <FormControl>
                    <Input
                      {...field}
                      type="password"
                      placeholder={t("confirm-password")}
                      className="shadow-sm rounded-xl p-2 h-[48px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  {/* Label */}
                  <FormLabel className="sr-only">{t("gender")}</FormLabel>

                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    {/* Trigger gender */}
                    <SelectTrigger className="shadow-sm rounded-xl p-2 h-[48px]">
                      <SelectValue placeholder={t("select-your-gender")} />
                    </SelectTrigger>

                    {/* Content selection */}
                    <SelectContent>
                      {genders.map((g) => (
                        <SelectItem key={g} value={g}>
                          {g}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* User type */}
            <div className="sr-only">
              <FormField
                control={form.control}
                name="userType"
                render={({ field }) => (
                  <FormItem>
                    {/* Label */}
                    <FormLabel className="sr-only">{t("role")}</FormLabel>

                    <Select onValueChange={field.disabled?.valueOf} defaultValue={"patient"}>
                      {/* Trigger user type */}
                      <SelectTrigger className="shadow-sm rounded-xl p-2 h-[48px]">
                        <SelectValue placeholder={t("select-your-role")} />
                      </SelectTrigger>

                      {/* Content selection */}
                      <SelectContent>
                        {userTypes.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Login button */}
          <div className="text-center mt-2 mr-auto flex gap-1 ">
            <span className="first-letter:capitalize">{t("already-have-an-account")}</span>
            <button
              type="button"
              className="border-none bg-transparent capitalize text-custom-rose-900 underline "
              onClick={() => {
                console.log(1111);
                changeForm(ChangeAuthForm.LOGIN);
              }}
            >
              {t("login")}
            </button>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full mt-2 bg-main-black  hover:bg-main-black/80 rounded-md "
            disabled={isPending || (!form.formState.isValid && form.formState.isSubmitted)}
          >
            {isPending ? (
              <p className="first-letter:capitalize">{t("creating-account")}</p>
            ) : (
              t("create-account")
            )}
          </Button>
          {error && <p className="text-red-500 mt-2">{error.message}</p>}
        </div>
      </form>
    </Form>
  );
}
