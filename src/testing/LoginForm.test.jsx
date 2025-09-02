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


// - We use render() to mount the LoginForm component with a mock handleSubmit function.
// - In the first test:
//   • We query the "Login" button using screen.getByRole().
//   • We use expect(...).toBeDisabled() to assert it is disabled on initial render.
// - In the second test:
//   • We use fireEvent.change() to fill in both the email and password fields.
//   • We assert with expect(...).toBeEnabled() that the button becomes enabled.
// - In the third test:
//   • We create a mock function using jest.fn() and pass it as handleSubmit.
//   • We fill in both input fields using fireEvent.change().
//   • We simulate a click with fireEvent.click().
//   • We assert with expect(mockTest).toHaveBeenCalledTimes(1) that submit was called once.
//   • We assert with expect(mockTest).toHaveBeenCalledWith({ email, password }) 
//     that the correct values were passed.
