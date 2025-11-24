"use client";

import { logoutUser } from "@/actions/users/UserActions";
import { logout } from "@/lib/features/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import Swal from "sweetalert2";

interface User {
  name: string;
  email: string;
  image?: string;
}

const UserProfile = () => {
  const [mounted, setMounted] = useState(false); // <-- for hydration
  const user = useAppSelector((state) => state.auth.user as User);
  const router = useRouter();
  const pathname = usePathname();

  const dispatch = useAppDispatch();

  useEffect(() => {
    setMounted(true); // Only render after client mount
  }, []);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (!result.success) return;

    dispatch(logout());
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "User Logged Out",
      showConfirmButton: false,
      timer: 1500,
    });
    router.push("/");
  };

  if (!mounted) return null; // Avoid SSR rendering

  return user ? (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img alt="User avatar" src={user?.image} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
      >
        <li className="disabled text-gray-500 ">
          <span className="flex items-center gap-2 text-base">
            <FaUser /> {user.name}
          </span>
        </li>
        {pathname.startsWith("/dashboard") ? (
          <li>
            <Link href="/" className="flex items-center gap-2">
              <FaHome /> Home
            </Link>
          </li>
        ) : (
          <li>
            <Link href="/dashboard" className="flex items-center gap-2 text-base">
              <MdDashboard /> Dashboard
            </Link>
          </li>
        )}
        <li onClick={handleLogout}>
          <span className="flex items-center gap-2 text-red-600 hover:bg-red-50 text-base">
            <FaSignOutAlt /> Logout
          </span>
        </li>
      </ul>
    </div>
  ) : (
    <ul className="menu menu-horizontal px-1">
      <li>
        <Link
          className="text-white hover:text-emerald-300 transition-colors font-semibold"
          href="/login"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          className="text-white hover:text-emerald-300 transition-colors font-semibold"
          href="/register"
        >
          Register
        </Link>
      </li>
    </ul>
  );
};

export default UserProfile;
