// src/hoc/withLogger.js
import React, { useEffect } from "react";

const withLogger = (WrappedComponent, options = { trackClicks: false }) => {
  return function LoggerWrapper(props) {
    useEffect(() => {
      console.log(`[logger] ${WrappedComponent.name} mounted`);

      return () => console.log(`[logger] ${WrappedComponent.name} unmounted`);
    }, []);

    const handleClick = (e) => {
      if (options.trackClicks) {
        console.log(
          `[logger] click event in ${WrappedComponent.name}`,
          e.target
        );
      }

      // Call original onClick if present
      if (props.onClick) props.onClick(e);
    };

    // Override onClick only if tracking clicks
    const newProps = options.trackClicks
      ? { ...props, onClick: handleClick }
      : props;

    return <WrappedComponent {...newProps} />;
  };
};

export default withLogger;

// ------------------------------------------------------------------------

// src/components/Button.js
// import React from "react";

// const Button = ({ onClick, children }) => {
//   return (
//     <button
//       style={{ padding: "10px 20px", margin: "5px", cursor: "pointer" }}
//       onClick={onClick}
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;

// ------------------------------------------------------------------------------

// src/App.js
// import React from "react";
// import withLogger from "./hoc/withLogger";
// import Button from "./components/Button";

// // Wrapped with logging + click tracking
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
