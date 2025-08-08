import React, { useState } from 'react'

const LoginForm = ({ handleSubmit }) => {
    const [email, setEmail] = useState("")
    const [password, setPassoword] = useState("")

    const isDisabled = !email || !password

    const onsubmit = (e) => {
        e.preventDefault()
        if (!isDisabled) {
            handleSubmit({ email, password })
        }
    }

    return (
        <form onSubmit={onsubmit}>
            <input type='email' placeholder='Enter Email Address' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' placeholder='enter password' value={password} onChange={(e) => setPassoword(e.target.value)} />
            <button type="submit" disabled={isDisabled}>
                Login
            </button>
        </form>
    )
}

export default LoginForm