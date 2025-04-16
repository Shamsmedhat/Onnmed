"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { MdOutlineLanguage } from "react-icons/md";

export default function DateAndLocale() {
  // Translation
  const locale = useLocale() as Locale;

  // Navigation
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Variables
  const today = new Date().toLocaleDateString(locale === "en" ? "en-US" : "ar-EG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex justify-center items-center gap-3">
      <div>{today}</div>
      <div>
        <Select
          defaultValue={locale}
          onValueChange={(value) =>
            router.push(`${pathname}?${searchParams.toString()}`, {
              locale: value as Locale,
            })
          }
        >
          <SelectTrigger className="w-auto gap-1 align-middle text-center">
            <SelectValue placeholder="EN" className="text-base" />
            <MdOutlineLanguage />
          </SelectTrigger>
          <SelectContent className="align-middle text-center">
            <SelectGroup className="text-base">
              <SelectItem value="en">EN</SelectItem>
              <SelectItem value="ar">ع</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
