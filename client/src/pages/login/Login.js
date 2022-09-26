import "./login.css";

const Login = () => {
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
        <div className="login-right">
          <div className="login-box">
            <input placeholder="e-mail" className="login-input" />
            <input placeholder="password" className="login-input" />
            <button className="login-button">Sign in</button>
            <span className="login-forget">Forgot password?</span>
            <button className="login-register-button">
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
