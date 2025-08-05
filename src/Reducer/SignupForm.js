import React, { useReducer } from "react";

// Step 1: Initial state
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
};

// Step 2: Reducer function
const formReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

const SignupForm = () => {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    dispatch({
      type: "UPDATE_FIELD",
      field: name,
      value: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted: ", formState);
    // Do validation or API call here
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input name="name" value={formState.name} onChange={handleChange} />
      </div>

      <div>
        <label>Email:</label>
        <input name="email" value={formState.email} onChange={handleChange} />
      </div>

      <div>
        <label>Password:</label>
        <input
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>Confirm Password:</label>
        <input
          name="confirmPassword"
          type="password"
          value={formState.confirmPassword}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            name="agreeTerms"
            checked={formState.agreeTerms}
            onChange={handleChange}
          />
          Agree to terms
        </label>
      </div>

      <button type="submit">Register</button>
      <button type="button" onClick={() => dispatch({ type: "RESET" })}>
        Reset
      </button>
    </form>
  );
};

export default SignupForm;
