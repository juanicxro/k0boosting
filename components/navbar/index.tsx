import { Separator } from "../ui/separator";
import { ModeToggle } from "../themeToggle";
import { NavLink } from "./nav-link";
import NavProfiledDropdownMenu from "./nav-dropdown-menu";
import {
  BookOpen,
  HandPlatter,
  House,
  Mail,
  UserRoundSearch,
} from "lucide-react";

export default function Navbar() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <p className="text-xl font-bold uppercase tracking-wider">UniteBoost</p>
        <Separator orientation="vertical" className="max-h-6" />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink href="/">
            <House />
            Home
          </NavLink>
          <NavLink href="/">
            <HandPlatter />
            Our services
          </NavLink>{" "}
          <NavLink href="/">
            <UserRoundSearch />
            Jobs
          </NavLink>{" "}
          <NavLink href="/">
            <BookOpen />
            About us
          </NavLink>{" "}
          <NavLink href="/">
            <Mail />
            Contact
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <NavProfiledDropdownMenu />
        </div>
      </div>
    </div>
  );
}
