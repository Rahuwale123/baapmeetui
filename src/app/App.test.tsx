import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { ReactNode } from "react";
import App from "./App";

vi.mock("@components/AppShell/AppShell", () => ({
  AppShell: ({ children }: { children: ReactNode }) => <div data-testid="app-shell">{children}</div>
}));

vi.mock("react-router-dom", async (originalImport) => {
  const actual = await originalImport<typeof import("react-router-dom")>();
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet" />
  };
});

describe("App", () => {
  it("renders the application shell", () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("app-shell")).toBeInTheDocument();
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });
});
