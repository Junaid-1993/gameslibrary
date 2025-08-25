import NavLink from "../NavLink";

export default function HeaderNavLinks() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/browsegames", label: "Browse Games" },
    { href: "/mylibrary", label: "My Library" },
  ];

  return (
    <nav className="my-4 flex flex-col gap-2 xl:my-0 xl:flex-row 2xl:gap-4">
      {links.map((link) => (
        <NavLink key={link.href} href={link.href}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
