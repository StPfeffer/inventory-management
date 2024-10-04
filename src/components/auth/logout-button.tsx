import { Button } from "../ui/button";
import { useAuth } from "./auth-context-provider";

interface LogoutButtonProps {
    label?: string;
}

const LogoutButton = ({
    label = "Logout"
}: LogoutButtonProps) => {
    const { logout } = useAuth();

    return (
        <Button onClick={logout}>
            {label}
        </Button>
    )
}

export default LogoutButton;
