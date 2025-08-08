import React from 'react'
import { useTheme } from './ThemeContext'

const ThemeToggler = () => {
    const { toggleTheme } = useTheme()
    return (
        <button onClick={toggleTheme}>Toggle theme</button>
    )
}

export default ThemeToggler