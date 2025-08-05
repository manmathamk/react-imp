import { useRef } from "react";

const useThrottle = (callback, delay) => {
    const lastCall = useRef(0);

    const throttleFunc = (...args) => {
        const now = Date.now();
        if (now - lastCall.current > delay) {
            lastCall.current = now
            callback(...args)
        }
    }
    return throttleFunc
}
export default useThrottle