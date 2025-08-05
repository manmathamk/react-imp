import React, { useReducer } from 'react'

const reducerFunc = (state, action) => {
    switch (action.type) {
        case "INCREMENT": return { count: state.count + 1 };
        case "DECREMENT": return { count: Math.max(0, state.count - 1) };
        case "RESET": return { count: action.payload }
        default: return state
    }
}

const CounterReducer = ({ initialVal }) => {
    const [state, dispatch] = useReducer(reducerFunc, { count: initialVal })
    return (
        <>
            <h2>counter: {state.count}</h2>
            <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
            <button onClick={() => dispatch({ type: "DECREMENT" })}>Devrement</button>
            <button onClick={() => dispatch({ type: "RESET", payload: initialVal })}>Reset</button>

        </>
    )
}

export default CounterReducer