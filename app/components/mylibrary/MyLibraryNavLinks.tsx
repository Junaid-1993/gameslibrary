import NavLink from "../NavLink";

export default function MyLibraryNavLinks(props: {
  userLibraryData: { lists: number; wishlist: number; favorites: number };
}) {
  const links = [
    { href: `/mylibrary/lists`, label: "Lists", data: props.userLibraryData.lists },
    { href: `/mylibrary/wishlist`, label: "Wishlist", data: props.userLibraryData.wishlist },
    { href: `/mylibrary/favorites`, label: "Favorites", data: props.userLibraryData.favorites },
  ];

  return (
    <nav className="border-border-400 flex gap-2 overflow-auto border-b text-nowrap xl:my-0 2xl:gap-4">
      {links.map((link) => (
        <NavLink key={link.href} href={link.href} isLibrary>
          {link.label} {`(${link.data})`}
        </NavLink>
      ))}
    </nav>
  );
}
