// src/hoc/withLogger.js
import React, { useEffect } from "react";

const withLogger = (WrappedComponent, { trackClicks = false } = {}) => {
  return (props) => {
    useEffect(() => {
      console.log(`[logger] ${WrappedComponent.name} mounted`);
      return () => console.log(`[logger] ${WrappedComponent.name} unmounted`);
    }, []);

    const handleClick = (e) => {
      if (trackClicks) {
        console.log(`[logger] click in ${WrappedComponent.name}`, e.target);
      }
      props.onClick?.(e); // call original handler if exists
    };

    return (
      <WrappedComponent
        {...props}
        onClick={trackClicks ? handleClick : props.onClick}
      />
    );
  };
};

export default withLogger;



// src/components/Button.js
// import React from "react";

// const Button = ({ onClick, children }) => (
//   <button
//     style={{ padding: "10px 20px", margin: "5px", cursor: "pointer" }}
//     onClick={onClick}
//   >
//     {children}
//   </button>
// );

// export default Button;


// src/App.js
// import React from "react";
// import withLogger from "./hoc/withLogger";
// import Button from "./components/Button";

// // Wrap Button with logger + click tracking
// const LoggedButton = withLogger(Button, { trackClicks: true });

// function App() {
//   const handleClick = () => {
//     console.log("[app] Button clicked (from App handler)");
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>withLogger HOC Example</h1>
//       <LoggedButton onClick={handleClick}>Click Me</LoggedButton>
//     </div>
//   );
// }

// export default App;
