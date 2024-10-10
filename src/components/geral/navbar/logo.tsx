import MountainIcon from "../../icon/mountain";

export default function HeaderLogo() {
  return (
    <a href="/" className="flex items-center">
      <MountainIcon className="h-6 w-6" />
      <span className="sr-only">Acme Inc</span>
    </a>
  )
}
