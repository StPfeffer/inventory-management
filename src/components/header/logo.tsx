import { SunIcon } from "lucide-react";

export default function HeaderLogo() {
  return (
    <a href="/" className="flex items-center">
      <SunIcon className="h-6 w-6" />
      <span className="sr-only">Acme Inc</span>
    </a>
  );
}