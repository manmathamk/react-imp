import React, { useEffect } from 'react'

const Child = ({ name }) => {

    useEffect(() => {
        console.log("child rendering")
    }, [])
    return (
        <div>Child</div>
    )
}

export default React.memo(Child)