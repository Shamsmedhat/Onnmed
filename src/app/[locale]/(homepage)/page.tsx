import Image from "next/image";
import mainBg from "@/../public/assets/images/main.jpg";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { cookies } from "next/headers";

export default function Page() {
  const t = useTranslations();
  const allCookies = cookies();
  console.log("allCookies", allCookies);
  
  return (
    <section className="container w-full">
      <div className="absolute inset-0 ">
        <Image
          alt="Onnmed – Experts in clinical research and medical publishing in the UAE..."
          src={mainBg}
          className="object-cover"
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="md:text-4xl xl:text-7xl font-bold mb-4 text-main-gold-700">
            {t("welcome-to-onnmed")}
          </h1>
          <p className="font-bold mb-6 md:text-xl xl:text-3xl">
            {t.rich("main-des", {
              br: () => <br />,
            })}
          </p>
          <Link
            href={"/appointment"}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition capitalize text-sm md:text-md xl:text-base"
          >
            {t("book-an-appointment-now")}
          </Link>
        </div>
      </div>
    </section>
  );
}
