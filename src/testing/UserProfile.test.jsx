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
