import "./login.css";
import { useRef, useContext } from "react";
import { loginCall } from "../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    //console.log(emailRef.current.value);
    //console.log(passwordRef.current.value);
    loginCall({ email, password }, dispatch);
  };

  console.log(user);

  return (
    <div className="login">
      <div className="login-wrapper">
        <div className="login-left">
          <h3 className="login-logo">SocialMedia</h3>
          <p className="login-desc">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga
            voluptate ullam obcaecati non provident dolorum.
          </p>
        </div>
        <div className="login-right" onSubmit={handleSubmit}>
          <form className="login-box">
            <input
              required
              placeholder="e-mail"
              ref={emailRef}
              type="email"
              className="login-input"
            />
            <input
              required
              minLength={6}
              ref={passwordRef}
              placeholder="password"
              className="login-input"
              type="password"
            />
            <button disabled={isFetching} className="login-button">
              {isFetching ? <CircularProgress size="18px" /> : "Sign in"}
            </button>
            <span className="login-forget">Forgot password?</span>
            <button disabled={isFetching} className="login-register-button">
              {isFetching ? <CircularProgress /> : "Create new account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
