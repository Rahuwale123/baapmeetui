import { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "@components/ui/button";
import { useAuthStore } from "@features/auth/state";
import { cn } from "@lib/utils";

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      <header className="border-b border-border bg-white/80 backdrop-blur">
        <div className="container flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-brand">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-brand-foreground font-bold">
              B
            </span>
            <span className="tracking-tight">baap connect</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-muted-ink">
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn("hidden md:inline-flex transition-colors hover:text-ink", isActive && "text-ink")
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/meetings"
              className={({ isActive }) =>
                cn("hidden md:inline-flex transition-colors hover:text-ink", isActive && "text-ink")
              }
            >
              My Meetings
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                cn("hidden md:inline-flex transition-colors hover:text-ink", isActive && "text-ink")
              }
            >
              Profile
            </NavLink>
          </nav>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <Button variant="outline" size="sm" asChild>
                <Link to="/meetings">Dashboard</Link>
              </Button>
            ) : (
              <Button size="sm" asChild>
                <Link to="/signup">Register Now</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container py-10 lg:py-16">{children}</div>
      </main>
      <footer className="border-t border-border bg-white/90">
        <div className="container py-6 text-center text-sm text-muted-ink">
          All right reserved @ the baap company
        </div>
      </footer>
    </div>
  );
};
