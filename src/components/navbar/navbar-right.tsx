import { useAuth } from "@/components/auth/auth-context-provider";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import { UserNav } from "@/components/admin/navbar/user-nav.tsx";
import { useNavigate } from "react-router-dom";

const NavbarRight = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className="ml-auto flex items-center">
            <a
                rel="noreferrer noopener"
                href="https://github.com/StPfeffer/inventory-management"
                target="_blank"
                className="mr-4"
            >
                <GitHubLogoIcon className="ml-2 w-5 h-5" />
            </a>

            <ModeToggle className="mr-4" />

            {user &&
                <UserNav />
            }
            {!user &&
                <Button onClick={() => handleNavigation("/login")}>Sign In</Button>
            }
        </div>
    )
}

export default NavbarRight;
