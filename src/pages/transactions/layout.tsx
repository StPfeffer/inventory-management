

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
import { Sidebar } from "@/components/admin-panel/sidebar/sidebar";
import { AuthProvider } from "@/components/auth/auth-context-provider";
import ProtectedRoute from "@/components/auth/protected-route";

export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) {
    return null;
  }

  return (
    <AuthProvider>
      <ProtectedRoute>
        <>
          <Sidebar />

          <main
            className={cn(
              "min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
              sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
            )}
          >
            {children}
          </main>

          <footer
            className={cn(
              "transition-[margin-left] ease-in-out duration-300",
              sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72"
            )}
          >
          </footer>
        </>
      </ProtectedRoute>
    </AuthProvider>
  );
}