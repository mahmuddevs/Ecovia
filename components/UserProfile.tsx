"use client";

import { logoutUser } from "@/actions/users/UserActions";
import { logout } from "@/lib/features/authSlice/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface User {
  name: string;
  email: string;
  image?: string;
}

const UserProfile = () => {
  const user = useAppSelector((state) => state.auth.user as User);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    const result = await logoutUser();
    if (!result.success) {
      return;
    }

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
  return (
    <>
      {user ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={user?.image} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-40 p-2 shadow"
          >
            <li>
              <a>{user.name}</a>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li onClick={handleLogout}>
              <a>Logout</a>
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
      )}
    </>
  );
};
export default UserProfile;
