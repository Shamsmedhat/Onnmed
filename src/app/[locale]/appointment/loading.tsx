import BookingSkeleton from "@/components/skeletons/booking.skeleton";
import { useTranslations } from "next-intl";
import React from "react";

export default function Loading() {
  // Translations
  const t = useTranslations();

  return (
    <section className="container mx-auto ">
      <h1 className=" text-2xl font-semibold my-4 first-letter:capitalize">
        {t("booking-an-appointment")}
      </h1>
      <div>
        <BookingSkeleton />;
      </div>
    </section>
  );
}
