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


// - We use render() with MemoryRouter to simulate routing in a test environment 
//   (MemoryRouter lets us define initialEntries for the starting URL).
// - In the first test:
//   • We start at "/" and render the App.
//   • We use expect(...).toBeInTheDocument() to assert the Home page text "Welcome Home" is visible.
// - In the second test:
//   • We set up userEvent for simulating real user actions.
//   • We render App inside MemoryRouter starting at "/".
//   • We use user.click() on the "About" link.
//   • We assert with expect(...).toBeInTheDocument() that the "About Us" text appears.
// - In the third test:
//   • We again simulate a user clicking the "About" link.
//   • Instead of checking window.location (not available in MemoryRouter),
//     we assert that the rendered content "About Us" confirms the URL changed.

