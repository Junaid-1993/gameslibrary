"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname();

  // Only set active if not on the homepage or not the Home link
  const isHome = href === "/";
  const isFirstLoadHome = pathname === "/" && isHome;
  const isActive = !isFirstLoadHome && pathname === href;

  //   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //     if (isActive) {
  //       e.preventDefault(); // Prevent navigation if already on this route
  //     }
  //   };

  return (
    <Link
      href={href}
      //   onClick={handleClick}
      //   aria-current={isActive ? "page" : undefined}
      className={`w-fit px-2 py-1 transition-colors ${isActive ? "text-primary-200 border-primary-200 border-b" : "text-primary-300 hover:text-primary-400"}`}
    >
      {children}
    </Link>
  );
}
