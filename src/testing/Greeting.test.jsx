import React from "react";
import Greeting from "./Greeting";
import { render, screen } from "@testing-library/react";

describe("<Greeting />", () => {
    test("renders Hello Guest! when nothing passed in props", () => {
        render(<Greeting name={""} />)
        expect(screen.getByRole("heading")).toHaveTextContent("Hello Guest!")
    })
    test("renders Hello Manu eif i pass Manu as name in props", () => {
        render(<Greeting name={"Manu"}/>)
        expect(screen.getByRole("heading")).toHaveTextContent("Hello Manu!")
    })
})