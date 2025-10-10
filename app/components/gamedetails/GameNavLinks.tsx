import NavLink from "../NavLink";

export default function GameNavLinks({ id }: { id: string }) {
  const links = [
    { href: `/game/${id}/overview`, label: "Game Overview" },
    { href: `/game/${id}/photos`, label: "Photos" },
    { href: `/game/${id}/videos`, label: "Videos" },
    { href: `/game/${id}/reviews`, label: "Reviews" },
    { href: `/game/${id}/experience`, label: "My Experience" },
    { href: `/game/${id}/journal`, label: "Game Journal" },
  ];

  return (
    <nav className="flex gap-2 overflow-auto p-6 text-nowrap xl:my-0 2xl:gap-4">
      {links.map((link) => (
        <NavLink key={link.href} href={link.href}>
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
