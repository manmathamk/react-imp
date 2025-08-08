import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "./ThemeContext";
import ThemeToggler from "./ThemeToggler";
import CurrentTheme from "./CurrentTheme";

describe("Theme context interaction", () => {
  test("default theme is light, toggles to dark and back to light", async () => {
    

    render(
      <ThemeProvider>
        <CurrentTheme />
        <ThemeToggler />
      </ThemeProvider>
    );

    // ✅ Default state
    expect(screen.getByText(/current theme: light/i)).toBeInTheDocument();

    // ✅ Click to dark
    await fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(screen.getByText(/current theme: dark/i)).toBeInTheDocument();

    // ✅ Click to light again
    await fireEvent.click(screen.getByRole("button", { name: /toggle theme/i }));
    expect(screen.getByText(/current theme: light/i)).toBeInTheDocument();
  });
});
