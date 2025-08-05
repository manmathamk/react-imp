import { useRef } from 'react';

const useDebounce = (callback, delay) => {
    const timerRef = useRef(null);

    const debouncedFunc = (...args) => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            callback(...args);
        }, delay);
    };

    return debouncedFunc;
};

export default useDebounce;
