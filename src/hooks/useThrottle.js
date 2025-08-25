import { useRef, useCallback } from "react";

const useThrottle = (callback, delay) => {
  const lastCall = useRef(0);

  const throttledFn = useCallback(
    (...args) => {
      const now = Date.now();
      if (now - lastCall.current >= delay) {
        lastCall.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  );

  return throttledFn;
};

export default useThrottle;

// -------------------------------------------------------------------------------

// import React, { useState, useEffect } from "react";
// import useThrottle from "../hooks/useThrottle";

// const ScrollTracker = () => {
//   const [scrollPos, setScrollPos] = useState(0);

//   const handleScroll = useThrottle(() => {
//     setScrollPos(window.scrollY);
//     console.log("Scroll Y:", window.scrollY);
//   }, 500); // only fires every 500ms

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [handleScroll]);

//   return (
//     <div style={{ height: "200vh", padding: "20px" }}>
//       <h2>Throttled Scroll Position: {scrollPos}px</h2>
//     </div>
//   );
// };

// export default ScrollTracker;
