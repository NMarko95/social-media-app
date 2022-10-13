import { createContext, useReducer, useState, useEffect } from "react";
import AuthReducer from "./AuthReducer";
import { io } from "socket.io-client";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")),
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  const [onlineUsers, setOnlineUsers] = useState([]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        onlineUsers,
        setOnlineUsers,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
