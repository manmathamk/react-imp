export const fetchUsers = () => {
  return async (dispatch) => {
    const controller = new AbortController();
    const signal = controller.signal;

    dispatch({ type: "FETCH_USERS_LOADING" });

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        signal,
      });
      const data = await res.json();

      dispatch({ type: "FETCH_USERS_SUCCESS", payload: data });
    } catch (error) {
      // If aborted, skip dispatching failure
      if (error.name === "AbortError") {
        console.log("Fetch aborted");
        return;
      }
      dispatch({ type: "FETCH_USERS_FAILURE", payload: error.message });
    }

    // Return a way to abort from the caller
    return () => controller.abort();
  };
};
