import BookAppointment from "@/components/features/book-appointment/index";
import BookingSkeleton from "@/components/skeletons/booking.skeleton";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export default async function Page() {
  // Translations
  const t = await getTranslations();

  return (
    <section className="container mx-auto min-h-screen ">
      <h1 className=" text-2xl font-semibold my-4 first-letter:capitalize">
        {t("booking-an-appointment")}
      </h1>
      <div>
        <Suspense fallback={<BookingSkeleton />}>
          <BookAppointment />
        </Suspense>
      </div>
    </section>
  );
}
