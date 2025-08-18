import React, { useEffect } from "react";

const withLogger = (WrappedComponent, options = { trackClicks: false }) => {
    return function LoggerWrapper(props) {
        useEffect(() => {
            console.log(`[logger] ${WrappedComponent.name} mounted`)

            return () => console.log(`[logger] ${WrappedComponent.name} unmounted`)
        })

        const handleClick = (e) => {
            if (options.trackClicks) {
                console.log(`[logger] click event in ${WrappedComponent.name}`, e.target)
            }

            if (props.onClick) props.onClick(e)


        }

        const newProps = options.trackClicks
            ? { ...props, onClick: handleClick } : props

            return <WrappedComponent {...newProps} />
    }
}

export default withLogger;


// App.js
// import React from "react";
// import withLogger from "./withLogger";
// import Profile from "./Profile";

// const ProfileWithLogger = withLogger(Profile);

// function App() {
//   return (
//     <div>
//       <ProfileWithLogger />
//     </div>
//   );
// }

// export default App;


// import withLogger from "./withLogger";
// import Button from "./Button";

// const TrackedButton = withLogger(Button, { trackClicks: true });

// function App() {
//   return (
//     <div>
//       <TrackedButton />
//     </div>
//   );
// }

// export default App;

