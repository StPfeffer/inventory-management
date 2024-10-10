import { UserNav } from '@/components/admin-panel/navbar/user-nav';
import { useAuth } from '@/components/auth/auth-context-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';

const NavbarRight = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="ml-auto flex items-center">
      <a
        rel="noreferrer noopener"
        href="https://github.com/StPfeffer/personal-expense-tracker.git"
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
        <Button onClick={() => navigate("/login")}>Sign In</Button>
      }
    </div>
  )
}

export default NavbarRight