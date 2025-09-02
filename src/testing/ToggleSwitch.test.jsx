import React from 'react'
import ToggleSwitch from './ToggleSwitch'
import { fireEvent, render, screen } from '@testing-library/react'

describe('<ToggleSwitch />', () => {
    test('initally button should show OFF', () => {
        render(<ToggleSwitch />)
        expect(screen.getByRole("button")).toHaveTextContent("OFF")
    })
    test("changes to ON when clicked once", () => {
        render(<ToggleSwitch />)
        fireEvent.click(screen.getByRole("button"))
        expect(screen.getByRole("button")).toHaveTextContent("ON")
    })
    test("toggle back to OFF on Switching twice", () => {
        render(<ToggleSwitch />)
        const button = screen.getByRole("button");

        fireEvent.click(button); // OFF → ON
        fireEvent.click(button); // ON → OFF

        expect(button).toHaveTextContent("OFF");
    })
})


// - We use render() to mount the ToggleSwitch component.
// - In the first test (initial state):
//   • We query the button using screen.getByRole().
//   • We assert with expect(...).toHaveTextContent("OFF") that it starts in OFF state.
// - In the second test (first toggle):
//   • We render the component and query the button.
//   • We simulate a click with fireEvent.click().
//   • We assert the button text changes to "ON".
// - In the third test (double toggle):
//   • We render and store the button in a variable.
//   • We click once (OFF → ON), then click again (ON → OFF).
//   • We assert the button text is back to "OFF".
