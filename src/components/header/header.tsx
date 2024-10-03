import { Button } from "@/components/ui/button";
import HeaderLogo from "./logo";
import { NavLink, NavLinks } from "./nav-link";
import { ModeToggle } from "../mode-toggle";

export default function Header() {
  const navLinks = [
    <NavLink key="home" href="/">Home</NavLink>,
    <NavLink key="dashboard" href="/dashboard">Dashboard</NavLink>,
    <NavLink key="services" href="/sobre">Sobre</NavLink>,
  ]

  return (
    <nav className="py-4 sticky top-0 z-50 w-full">
      <div className="w-full mx-auto px-4">
        <div className="flex justify-between h-14 items-center">
          <HeaderLogo />
          <NavLinks links={navLinks} />
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button size="sm">Sign in</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
