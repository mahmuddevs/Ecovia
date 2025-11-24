"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHandHoldingHeart, FaLeaf, FaUsers } from "react-icons/fa6";
import { HiOutlineCalendarDays, HiOutlineChartBar } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { MdDashboard } from "react-icons/md";

interface SidebarProps {
  navActive: boolean;
  close: () => void;
}

interface MenuItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const Sidebar = ({ navActive, close }: SidebarProps) => {
  const [mounted, setMounted] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const userType = user?.userType;

  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const menuItems: Record<string, MenuItem[]> = {
    admin: [
      { label: "Overview", href: "/dashboard/admin", icon: <MdDashboard /> },
      { label: "Manage Users", href: "/dashboard/admin/manage-users", icon: <FaUsers /> },
      { label: "Manage Event", href: "/dashboard/admin/event-management", icon: <HiOutlineCalendarDays /> },
      { label: "Donations", href: "/dashboard/admin/donations", icon: <FaHandHoldingHeart /> },
      { label: "Reports & Analytics", href: "/dashboard/admin/reports", icon: <HiOutlineChartBar /> },
    ],
    volunteer: [
      { label: "Overview", href: "/dashboard/volunteer", icon: <MdDashboard /> },
      { label: "My Events", href: "/dashboard/volunteer/my-events", icon: <HiOutlineCalendarDays /> },
      { label: "Donations", href: "/dashboard/volunteer/donations", icon: <FaHandHoldingHeart /> },
    ],
    donor: [
      { label: "Overview", href: "/dashboard/donor", icon: <MdDashboard /> },
      { label: "My Donations", href: "/dashboard/donor/my-donations", icon: <FaHandHoldingHeart /> },
      { label: "Reports", href: "/dashboard/donor/reports", icon: <HiOutlineChartBar /> },
    ],
  };

  const currentMenu = menuItems[userType || ""] || [];

  return (
    <aside>
      <div className="flex items-center justify-between p-6">
        <Link href="/" className="flex items-center gap-2">
          <FaLeaf className={`${navActive ? "" : "mx-auto"} text-3xl text-emerald-400`} />
          {navActive && <span className="inline font-bold text-black text-2xl">EcoVia</span>}
        </Link>
        <div className="flex items-center text-2xl xl:hidden" onClick={close}>
          <IoMdClose />
        </div>
      </div>

      <nav className="mt-2">
        <ul className={`dash-nav flex flex-col gap-4 ${navActive ? "" : "items-center"}`}>
          {currentMenu.map((item) => {
            const isActive = pathname === item.href; // check if current URL matches
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    ${navActive ? "" : "w-full justify-center"} 
                    flex items-center gap-2 w-full py-2
                    ${isActive ? "bg-emerald-200 rounded-lg" : "hover:bg-emerald-100"}
                  `}
                >
                  {item.icon}
                  {navActive && <span>{item.label}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
