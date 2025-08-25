// src/components/ErrorBoundary.js
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details (you can also send to a service like Sentry)
    console.error("Caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      return (
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#ffecec",
            color: "#cc0000",
          }}
        >
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

// -----------------------------------------------------------------

// App.js
// import React from "react";
// import ErrorBoundary from "./components/ErrorBoundary";

// const BuggyComponent = () => {
//   // Simulate a crash
//   throw new Error("Oops! This is a simulated error.");
// };

// const App = () => {
//   return (
//     <div>
//       <h1>Error Boundary Example</h1>
//       <ErrorBoundary>
//         <BuggyComponent />
//       </ErrorBoundary>
//     </div>
//   );
// };

// export default App;
