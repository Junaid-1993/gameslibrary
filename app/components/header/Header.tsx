import Link from "next/link";
import AuthButtons from "./AuthButtons";
import Brand from "../Brand";
import HeaderNavLinks from "./HeaderNavLinks";
import DesktopHeaderSearch from "./DesktopHeaderSearch";
import MobileSidebarMenu from "./MobileSidebarMenu";

export default function Header() {
  return (
    <>
      {/* Top Bar */}
      <header className="flex items-center justify-between gap-6 px-3 py-3 md:px-4 md:py-3.5 xl:px-6 2xl:gap-12 2xl:px-12 2xl:py-5">
        <MobileSidebarMenu />
        <Brand />

        {/* Desktop content */}
        <div className="hidden w-full lg:flex-row lg:items-center lg:gap-5 xl:flex xl:justify-between">
          <DesktopHeaderSearch />
          <HeaderNavLinks />
          <AuthButtons />
        </div>

        {/* Compact Avatar/Icon on mobile only */}
        <div className="flex h-12 w-12 items-center justify-center xl:hidden">
          <Link href="/signin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={32}
              height={32}
              viewBox="0 0 24 24"
              className="sm:h-[34px] sm:w-[34px]"
            >
              <path
                fill="#87bbff"
                d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
              ></path>
            </svg>
          </Link>
        </div>
      </header>
    </>
  );
}
