import React, { useEffect, useRef, useState } from 'react'

const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, seterror] = useState(null)
    const fetchOnceRef = useRef(false)

    const fetchData = async () => {
        setLoading(true)
        seterror(null)
        try {
            const response = await fetch(url)
            if (!response.ok) {
                seterror(response.status)
                setLoading(false)
                throw new Error(`HTTP Error Status: ${response.status}`)

            }
            const data = await response.json()
            // console.log("data---------------------", data)
            setLoading(false)
            setData(data)
        } catch (error) {
            seterror(error)
            setLoading(false)
            console.error("Got some Error:", error)
        }
    }

    useEffect(() => {
        if (!fetchOnceRef.current) {
            fetchData()
            fetchOnceRef.current = true
        }

    }, [url])

    return [data, loading, error]
}

export default useFetch