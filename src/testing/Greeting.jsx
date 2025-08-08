import React from 'react'

const Greeting = ({ name }) => {
    return <h1>{name ? `Hello ${name}!` : "Hello Guest!"}</h1>
}

export default Greeting