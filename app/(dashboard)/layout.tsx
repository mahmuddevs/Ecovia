"use client";

import { useEffect, useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navActive, setNavActive] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleNav = () => setNavActive((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1280;
      setIsMobile(mobile);
      if (!mobile) {
        setNavActive(true); // Default to expanded on desktop
      } else {
        setNavActive(false); // Default to closed on mobile
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="min-h-screen relative bg-gray-50">
      {/* Sidebar - Fixed Position Always */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-dvh bg-emerald-50 overflow-y-auto
          transition-transform duration-300 ease-in-out
          ${isMobile
            ? navActive
              ? "translate-x-0 w-[280px] shadow-2xl"
              : "-translate-x-full w-[280px]"
            : navActive
              ? "translate-x-0 w-[280px]"
              : "translate-x-0 w-20"
          }
        `}
      >
        <Sidebar navActive={navActive} close={() => setNavActive(false)} />
      </aside>

      {/* Mobile Overlay/Backdrop */}
      {isMobile && navActive && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 backdrop-blur-sm"
          onClick={() => setNavActive(false)}
        />
      )}

      {/* Main Content Area */}
      <div
        className={`
          min-h-screen transition-all duration-300 ease-in-out
          ${isMobile
            ? "ml-0" // No margin on mobile
            : navActive
              ? "ml-[280px]" // Margin matches expanded sidebar
              : "ml-20" // Margin matches collapsed sidebar
          }
        `}
      >
        <Header handleNav={handleNav} />
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </main>
  );
}
