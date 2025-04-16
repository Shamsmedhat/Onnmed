import DateAndLocale from "./components/date-and-locale";
import Logo from "./components/logo";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default async function Header() {
  return (
    <header className="z-50 relative">
      <nav className="flex items-center justify-between gap-4 py-3 rtl:flex-row bg-sidebar border-sidebar-border border-b shadow-sm">
        {/* Logo & Sidebar trigger*/}
        <div className="flex items-center gap-4 justify-center">
          <SidebarTrigger />
          <Logo />
        </div>

        {/* Today date & locale */}
        <div className="me-9">
          <DateAndLocale />
        </div>
      </nav>
    </header>
  );
}
