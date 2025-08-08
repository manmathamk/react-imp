import React from "react";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { rest } from "msw";
import { server } from "./mocks/server";
import PostList from "./PostList";

describe("<PostList />", () => {
  test("shows loader while request is in flight", async () => {
    render(<PostList />);
    expect(screen.getByText(/loading posts/i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText(/loading posts/i));
  });

  test("renders post titles on success", async () => {
    render(<PostList />);
    expect(await screen.findByText(/first post/i)).toBeInTheDocument();
    expect(screen.getByText(/second post/i)).toBeInTheDocument();
  });

  test("shows error message on API failure", async () => {
    server.use(
      rest.get("/api/posts", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<PostList />);
    expect(await screen.findByText(/failed to load posts/i)).toBeInTheDocument();
  });
});
