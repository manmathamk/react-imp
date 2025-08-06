import logo from './logo.svg';
import './App.css';
import useFetch from './hooks/useFetch';
import { useCallback, useEffect, useState } from 'react';
import useDeounce from './hooks/useDebounce';
import useThrottle from './hooks/useThrottle';
import useLocalStorage from './hooks/useLocalStorage';
import Child from './components/Child';
import ValidationForm from './validations/FormValidations';
import { useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext'
import { AuthContext } from './contexts/AuthContext';
import SignupForm from './Reducer/SignupForm';
import CartReducer from './Reducer/CartReducer';
import BuggyComponent from './ErrorBoundary/BuggyComponent';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Home from './components/Home';
// import CounterReducer from './Reducer/CounterReducer';


const userData = {
  name: "manu",
  age: 30
}
function App() {
  // const { theme, toggleTheme } = useContext(ThemeContext); // ✅ This will now work
  // const { user, login, logout } = useContext(AuthContext)

  // const [name, setName] = useState("manu")
  // const [count, setCount] = useState(0)
  // const increment = useCallback(() => {
  //   setCount(prev => prev + 1)
  // }, [name])
  // const [theme, setTheme] = useLocalStorage("theme", "light");
  // useFetch Hook
  // const [data, loading, error] = useFetch('https://jsonplaceholder.typicode.com/users')
  // const [apiData, setApiData] = useState([])
  // useEffect(() => {
  //   if (data) {
  //     setApiData(data);
  //     console.log(data);
  //   }
  // }, [data]);

  // if (loading) return <p>Loading....</p>
  // if (error) return <p>Error: {error}</p>
  // useFetch Hook
  // usedebounce
  // const handleChange = useDeounce((e) => {
  //   console.log('Debounced input:', e.target.value);
  // }, 3000)
  // const handleConsole = useThrottle(() => {
  //   console.log('clicked at', new Date().toLocaleTimeString());
  // }, 1000);

  // const toggleTheme = () => {
  //   setTheme((prev) => (prev === "light" ? "dark" : "light"));
  // };



  return (
    <div className="App">
      <Home />
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
