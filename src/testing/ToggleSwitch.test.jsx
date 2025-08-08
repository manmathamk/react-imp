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