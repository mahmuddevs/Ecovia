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

  const handleNav = () => setNavActive((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setNavActive(false); // hide on mobile/tablet
      } else {
        setNavActive(true); // show on desktop
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="flex flex-col xl:flex-row">
        {/* Sidebar */}
        <div
          className={`
            bg-emerald-50 h-screen 
            transition-all duration-500 ease-in-out
            ${navActive ? "translate-x-0 xl:w-2/12" : "-translate-x-full xl:w-[80px]"}
            max-xl:fixed max-xl:top-0 max-xl:left-0 max-xl:z-50 max-xl:w-[280px] xl:relative xl:translate-x-0
          `}
        >
          <Sidebar navActive={navActive} close={() => setNavActive(false)} />
        </div>

        {/* Mobile overlay */}
        {navActive && (
          <div
            className="fixed inset-0 bg-black/40 z-40 xl:hidden transition-opacity duration-500"
            onClick={() => setNavActive(false)}
          ></div>
        )}

        {/* Content */}
        <div
          className={`
            transition-all duration-500 ease-in-out min-h-screen
            w-full
            ${navActive ? "xl:ml-3/12" : ""}
          `}
        >
          <Header handleNav={handleNav} />
          <div className="p-4">{children}</div>
        </div>
      </div>
    </main>
  );
}
