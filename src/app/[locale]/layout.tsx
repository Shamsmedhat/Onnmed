import { Locale, routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import Providers from "@/components/providers";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";
import Header from "@/components/layout/header";
import { Toaster } from "sonner";

// Variable
const inter = Inter({ subsets: ["latin"] });

// type
type LocaleLayoutProps = {
  children: React.ReactNode;
  params: { locale: Locale };
};

export default async function LocaleLayout({ children, params: { locale } }: LocaleLayoutProps) {
  // Redirect to not found page if locale is not supported
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={inter.className} dir={locale === "ar" ? "rtl" : "ltr"}>
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <Toaster position="top-center" />

            <main className="w-full bg-gray-100 h-full">
              <Header />
              {children}
            </main>
          </SidebarProvider>
        </Providers>
      </body>
    </html>
  );
}
