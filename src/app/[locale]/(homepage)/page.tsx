import Image from "next/image";
import mainBg from "@/../public/assets/images/main.jpg";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Page() {
  const t = useTranslations();

  return (
    <section className="container w-full">
      <div className="relative">
        <Image
          alt="Onnmed – Experts in clinical research and medical publishing in the UAE, offering end-to-end support from study design to high-impact journal publication, bridging research, innovation, and patient-centric care."
          src={mainBg}
          className="absolute object-cover -z-10"
          placeholder="blur"
          quality={100}
          fill
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-black/50 h-screen w-screen flex items-center justify-center ">
        <div className="text-center text-white w-1/2">
          <h1 className="text-7xl font-bold mb-4 text-main-gold-700">{t("welcome-to-onnmed")}</h1>
          <p className=" font-bold mb-6 text-3xl">
            {t.rich("main-des", {
              br: () => <br />,
            })}
          </p>
          <Link
            href={"/appointment"}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition capitalize"
          >
            {t("book-an-appointment-now")}
          </Link>
        </div>
      </div>{" "}
    </section>
  );
}
