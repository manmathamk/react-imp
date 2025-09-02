import React from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import UserProfile from "./UserProfile";

beforeEach(() => {
    jest.resetAllMocks();
});

describe("<UserProfile />", () => {
    test("shows loading text initially", () => {
        render(<UserProfile />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test("displays user name after successful fetch", async () => {
        const mockUser = { name: "John Doe" };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockUser),
            })
        );

        render(<UserProfile />);

        expect(await screen.findByText(/john doe/i)).toBeInTheDocument();

        expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
    });



    test("displays error message when API fails", async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error("API Error")));

        render(<UserProfile />);

        expect(await screen.findByText(/error loading user data/i)).toBeInTheDocument();

    });


});


// - We call jest.resetAllMocks() in beforeEach() to reset fetch mocks before every test.
// - In the first test (loading state):
//   • We render <UserProfile />.
//   • We assert with expect(...).toBeInTheDocument() that "Loading" text is shown initially.
// - In the second test (success state):
//   • We mock global.fetch to resolve successfully with a user object { name: "John Doe" }.
//   • We render <UserProfile />.
//   • We use screen.findByText() to asynchronously wait for "John Doe" to appear.
//   • We assert the "Loading" text is removed using queryByText().
// - In the third test (failure state):
//   • We mock global.fetch to reject with an error ("API Error").
//   • We render <UserProfile />.
//   • We use screen.findByText() to assert that the error message "Error loading user data" is displayed.
