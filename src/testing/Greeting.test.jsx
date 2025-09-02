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

// - We use render() to mount the Greeting component.  
// - We use screen.getByRole("heading") to query the heading element.  
// - We use expect(...).toHaveTextContent() to assert the text content:  
//     • "Hello Guest!" when no name is passed  
//     • "Hello Manu!" when "Manu" is passed  
// - This verifies that the component correctly renders props.