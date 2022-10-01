import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id: "63297eb26e1c620d329e3cea",
    username: "Marko",
    email: "marko@gmail.com",
    password: "123456",
    profilePicture: "",
    coverPicture: "",
    followers: [],
    following: ["6329a763e1b99f7275c95694", "6329a75be1b99f7275c95692"],
    isAdmin: false,
    createdAt: "2022-09-20T08:49:54.031+00:00",
    updatedAt: "2022-09-20T13:17:15.069+00:00",
  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
