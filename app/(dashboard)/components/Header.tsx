"use client";
import UserProfile from "@/components/UserProfile";
import { CiMenuFries } from "react-icons/ci";

interface HeaderProps {
  handleNav: () => void;
}

const Header = ({ handleNav }: HeaderProps) => {
  return (
    <header className="flex bg-gray-200 shadow-md justify-between items-center p-6 sticky top-0 z-30">
      <div onClick={handleNav} className="cursor-pointer text-2xl">
        <CiMenuFries />
      </div>
      <div>
        <UserProfile />
      </div>
    </header>
  );
};
export default Header;
