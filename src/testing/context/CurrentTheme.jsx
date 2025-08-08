import React from 'react'
import { useTheme } from './ThemeContext'

const CurrentTheme = () => {
    const { theme } = useTheme()
    return (
        <div>current theme: {theme}</div>
    )
}

export default CurrentTheme