import "./login.css";
import { useRef } from "react";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
  };

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
            <button className="login-button">Sign in</button>
            <span className="login-forget">Forgot password?</span>
            <button className="login-register-button">
              Create new account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
