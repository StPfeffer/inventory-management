import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const getUserInitials = (name: string | undefined) => {
    if (!name) {
        return "";
    }

    name = name.trim();

    if (name.length <= 2) {
        return name;
    }

    return name
        .split(/\s+/)
        .map(w => w.charAt(0))
        .slice(0, 2)
        .join("");
}