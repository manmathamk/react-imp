import logo from './logo.svg';
import './App.css';
import useFetch from './hooks/useFetch';
import { useCallback, useEffect, useState } from 'react';
import useDeounce from './hooks/useDebounce';
import useThrottle from './hooks/useThrottle';
import useLocalStorage from './hooks/useLocalStorage';
import Child from './components/Child';
import { useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext'
import { AuthContext } from './contexts/AuthContext';
import SignupForm from './Reducer/SignupForm';
import CartReducer from './Reducer/CartReducer';
import BuggyComponent from './ErrorBoundary/BuggyComponent';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Home from './components/Home';
import UserProfile from './testing/UserProfile';
import LoginForm from './testing/LoginForm';
import { ThemeProvider } from './testing/context/ThemeContext';
import ThemeToggler from './testing/context/ThemeToggler';
import CurrentTheme from './testing/context/CurrentTheme';
import BasicRotuing from './Routes/Basic-Routing';
import DynamicRouting from './Routes/Dynamic-Routing-with-Params';
import IndexRoutes from './Routes/Index-Routes';
import LazyLoading from './Routes/Lazy-Loading-Routes-with-React.lazy';
import MultipleLayuts from './Routes/Multiple-Layouts';
import Nested from './Routes/Nested-Routing';
import NotFound404 from './Routes/Not-Found-Route-404';
// import CounterReducer from './Reducer/CounterReducer';


// const userData = {
//   name: "manu",
//   age: 30
// }
function App() {

  const [name, setName] = useState("manu")
  const [count, setCount] = useState(0)
  const increment = useCallback(() => {
    setCount(prev => prev + 1)
  }, [name])

  


  return (
    <div className="App">
      <NotFound404 />
      {/* <Home /> */}
      {/* <UserProfile  /> */}
      {/* <ThemeProvider>
        <ThemeToggler />
        <CurrentTheme />
      </ThemeProvider> */}

      {/* <LoginForm /> */}
      {/* <SignupForm /> */}
      {/* <CartReducer /> */}
      {/* <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary> */}
      {/* <Child name={name} />
      {count}
      <button onClick={increment}>+</button> */}
      {/* <div style={{ background: theme === "dark" ? "#333" : "#fff", color: theme === "dark" ? "#fff" : "#000", padding: "20px" }}>
        <h1>Current Theme: {theme}</h1>
        <button onClick={toggleTheme}>Toggle</button>
      </div> */}
      {/* <div onClick={handleConsole}> */}
      {/* useFetch Hook
      {apiData.length > 0 && apiData?.map((line, x) =>
        <p key={x}>
          {line.name}
        </p>
      )} */}
      {/* {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Age: {user.age}</p>
        </div>
      ) : (
        <p>No user logged in</p>
      )}

      <button onClick={() => login(userData)}>Login</button>
      <button onClick={() => logout()}>logout</button> */}
      {/* usedebounce */}
      {/* <input type="text" onChange={handleChange} /> */}
      {/* usedebounce */}

      {/* <CounterReducer initialVal={5} /> */}
      {/* </div> */}
      {/* <div style={{ width: "500px", padding: "10%" }}> <ValidationForm /></div> */}

    </div>
  );
}

export default App;
