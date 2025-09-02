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


// - We use render() to mount the PostList component.\
// - In the first test (loader state):
//   • We assert "Loading posts" is visible immediately.
//   • We use waitForElementToBeRemoved() to wait until the loader disappears after the request finishes.
// - In the second test (success state):
//   • We use screen.findByText() to asynchronously wait for "First Post" to appear.
//   • We assert that "Second Post" is also in the document, confirming posts are rendered on success.
// - In the third test (failure state):
//   • We use server.use() with msw to mock the API returning a 500 error.
//   • We render PostList and use screen.findByText() to assert the error message "Failed to load posts" is shown.
