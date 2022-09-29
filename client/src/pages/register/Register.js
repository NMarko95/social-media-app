import "./register.css";
import { useRef } from "react";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const confirmRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;
    const confirm = confirmRef.current.value;
    if (password !== confirm) {
      console.log("Passwords do not match!");
    }
  };

  return (
    <div className="register">
      <div className="register-wrapper">
        <div className="register-left">
          <h3 className="register-logo">SocialMedia</h3>
          <p className="register-desc">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga
            voluptate ullam obcaecati non provident dolorum.
          </p>
        </div>
        <div className="register-right">
          <form className="register-box" onSubmit={handleSubmit}>
            <input
              required
              ref={usernameRef}
              placeholder="username"
              className="register-input"
            />
            <input
              required
              type="email"
              ref={emailRef}
              placeholder="e-mail"
              className="register-input"
            />
            <input
              required
              ref={passwordRef}
              type="password"
              placeholder="password"
              className="register-input"
              minLength={6}
            />
            <input
              required
              type="password"
              ref={confirmRef}
              placeholder="confirm password"
              className="register-input"
            />
            <button type="submit" className="register-button">
              Sign up
            </button>
            <button className="register-login-button">Log into account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
