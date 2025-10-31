import { FaLeaf } from "react-icons/fa6";
// import UserProfile from "./UserProfile";
import Link from "next/link";
import UserProfile from "./UserProfile";

const Header = () => {
  const navItems = (
    <>
      <li>
        <Link
          href="/"
          className="text-black lg:text-white hover:text-emerald-300 transition-colors font-semibold"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          className="text-black lg:text-white hover:text-emerald-300 transition-colors font-semibold"
        >
          About Us
        </Link>
      </li>
      <li>
        <Link
          href="/events"
          className="text-black lg:text-white hover:text-emerald-300 transition-colors font-semibold"
        >
          Events
        </Link>
      </li>
      <li>
        <Link
          href="/donate"
          className="text-black lg:text-white hover:text-emerald-300 transition-colors font-semibold"
        >
          Donate
        </Link>
      </li>
      <li>
        <Link
          href="/contact"
          className="text-black lg:text-white hover:text-emerald-300 transition-colors font-semibold"
        >
          Contact Us
        </Link>
      </li>
    </>
  );
  return (
    <header className="w-full bg-black/40 backdrop-blur-sm fixed top-0 z-[999]">
      <div className="navbar justify-between global-container">
        <Link href="/" className="flex items-center gap-2">
          <FaLeaf className="h-6 w-6 text-tprimary" />
          <span className="font-bold text-white text-2xl">EcoVia</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>
          <div className="flex items-center">
            <UserProfile />
            <div className="dropdown relative">
              <div
                tabIndex={0}
                role="button"
                className="hover:bg-gray-100/40 cursor-pointer rounded-lg p-2 lg:hidden transition-colors duration-300 ms-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="#ffffff"
                  viewBox="0 0 24 24"
                  stroke="#ffffff"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-4 absolute -right-2 w-52 p-2 shadow"
              >
                {navItems}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
