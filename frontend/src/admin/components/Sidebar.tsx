import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

export type SidebarItem = {
  label: string;
  to: string;
};

type SidebarProps = {
  items: SidebarItem[];
};

const Sidebar = ({ items }: SidebarProps) => {
  return (
    <nav className="flex gap-2 overflow-x-auto md:flex-col md:gap-1">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors whitespace-nowrap",
              "hover:bg-secondary hover:text-foreground",
              isActive ? "bg-secondary text-foreground" : "text-muted-foreground"
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
};

export default Sidebar;
