import React from "react";
import SearchBox from "./SearchBox";
import { fireEvent, render, screen } from "@testing-library/react";

jest.useFakeTimers()

describe("<SearchBox /> with debounce", () => {
    test("onsearch is not called immediately", () => {
        const mockSearch = jest.fn()
        render(<SearchBox onSearch={mockSearch} />)
        fireEvent.change(screen.getByPlaceholderText(/search/i), {
            target: { value: "Hello" }
        })
        expect(mockSearch).not.toHaveBeenCalled()
    })

    test("onSearch is called once after 500ms", () => {
        const mockSearch = jest.fn()
        render(<SearchBox onSearch={mockSearch} />)

        fireEvent.change(screen.getByPlaceholderText(/search/i), {
            target: { value: "Hello" }
        })
        jest.advanceTimersByTime(500)
        expect(mockSearch).toHaveBeenCalledTimes(1)
        expect(mockSearch).toHaveBeenCalledWith("Hello")
    })

    test("typing quickly calls onSearch only with last value", () => {
        const mockSearch = jest.fn()
        render(<SearchBox onSearch={mockSearch} />)

        fireEvent.change(screen.getByPlaceholderText(/search/i), {
            target: { value: "H" }
        })

        fireEvent.change(screen.getByPlaceholderText(/search/i), {
            target: { value: "hell" }
        })

        jest.advanceTimersByTime(300)

        fireEvent.change(screen.getByPlaceholderText(/search/i), {
            target: { value: "hello!" }
        })
        jest.advanceTimersByTime(500)
        expect(mockSearch).toHaveBeenCalledTimes(1)
        expect(mockSearch).toHaveBeenCalledWith("hello!")
    })

})


// - We use jest.useFakeTimers() so we can control and advance timer-based debounce logic.
// - In the first test (immediate call prevention):
//   • We render SearchBox with a mock onSearch function.
//   • We simulate typing with fireEvent.change().
//   • We assert with expect(...).not.toHaveBeenCalled() that onSearch is not triggered right away.
// - In the second test (debounce success):
//   • We render SearchBox with a mock onSearch.
//   • We type "Hello" into the input.
//   • We advance timers by 500ms using jest.advanceTimersByTime().
//   • We assert onSearch is called exactly once and with "Hello" as argument.
// - In the third test (typing quickly):
//   • We render SearchBox with a mock onSearch.
//   • We simulate typing multiple quick changes ("H" → "hell").
//   • We advance time by 300ms (less than debounce) so earlier calls are ignored.
//   • We type "hello!" and then advance 500ms.
//   • We assert onSearch was called once, with only the last value "hello!".
