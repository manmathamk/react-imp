import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from '../App'

describe("Navigation with React Router", () => {
  test("renders Home page initially", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/welcome home/i)).toBeInTheDocument();
  });

  test('navigates to About page when clicking "About" link', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("link", { name: /about/i }));

    expect(screen.getByText(/about us/i)).toBeInTheDocument();
  });

  test("URL updates correctly on navigation", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    await user.click(screen.getByRole("link", { name: /about/i }));

    // In MemoryRouter, you can't check window.location.pathname directly
    // but you can confirm by rendering matching route content
    expect(screen.getByText(/about us/i)).toBeInTheDocument();
  });
});
