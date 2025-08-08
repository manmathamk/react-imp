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