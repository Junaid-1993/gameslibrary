import { Turn as Menu } from "hamburger-react";

export default function Hamburger({
  isOpen,
  handleToggle,
}: {
  isOpen: boolean;
  handleToggle: (open: boolean) => void;
}) {
  return (
    <div className="transition-transform sm:scale-105 xl:hidden">
      <Menu
        color="#87bbff"
        label="Show menu"
        size={26}
        toggled={isOpen}
        onToggle={(toggled) => handleToggle(toggled)}
      />
    </div>
  );
}
