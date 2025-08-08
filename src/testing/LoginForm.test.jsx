import React from 'react'
import LoginForm from './LoginForm'
import { fireEvent, render, screen } from '@testing-library/react'
// import { render, screen, } from '@testing-library/react'
describe('<Loginform />', () => {
    test('submit button disabled during initial render', () => {
        render(<LoginForm handleSubmit={jest.fn()} />)
        expect(screen.getByRole("button", { name: /Login/i })).toBeDisabled()
    })

    test("button becomes enabled when both fields are filled", () => {
        render(<LoginForm handleSubmit={jest.fn()} />)
        fireEvent.change(screen.getByPlaceholderText(/Enter Email Address/i), {
            target: { value: "test@dtc.com" }
        })
        fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
            target: { value: "test@123" }
        })
        expect(screen.getByRole("button", { name: /login/i })).toBeEnabled()
    })

    test("call handlesublit on click with correct values", () => {
        const mockTest = jest.fn()
        render(<LoginForm handleSubmit={mockTest} />)
        fireEvent.change(screen.getByPlaceholderText(/Enter Email Address/i), {
            target: { value: "test@dtc.com" }
        })
        fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
            target: { value: "test@123" }
        })
        fireEvent.click(screen.getByRole("button", { name: /login/i }))

        expect(mockTest).toHaveBeenCalledTimes(1)
        expect(mockTest).toHaveBeenCalledWith({
            email: "test@dtc.com",
            password: "test@123"
        })
    })
})