import { useNavigate } from "react-router-dom";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
} from "react";
import { User } from "shared/types/user.ts";

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    useEffect(() => {
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        setIsLoading(false);
    }, []);

    const login = (userData: User) => {
        if (userData.id === 0) {
            return;
        }

        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        handleNavigation("/dashboard");
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        handleNavigation("/");
    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, isLoading }}>
            {!isLoading ? children : null}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return context;
};
