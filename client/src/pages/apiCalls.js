import axios from "axios";

export const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const response = await axios.post(
      "http://localhost:8800/api/auth/login",
      userCredentials
    );
    dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem("user", JSON.stringify(response.data));
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};

export const logoutCall = (dispatch) => {
  dispatch({ type: "SIGN_OUT" });
  localStorage.removeItem("user");
  window.location.replace("/login");
};
