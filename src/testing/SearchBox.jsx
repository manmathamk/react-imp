import React, { useEffect, useState } from "react";

const SearchBox = ({ onSearch }) => {
    const [query, setQuery] = useState("")

    useEffect(() => {
        if (!query) return

        const handler = setTimeout(() => {
            onSearch(query)
        }, 500);

        return () => clearTimeout(handler)
    }, [query, onSearch])

    return (
        <input type="text" placeholder="search..." value={query} onChange={(e) => setQuery(e.target.value)} />
    )
}

export default SearchBox