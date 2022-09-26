import "./register.css";

const Register = () => {
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
          <div className="register-box">
            <input placeholder="username" className="register-input" />
            <input placeholder="e-mail" className="register-input" />
            <input placeholder="password" className="register-input" />
            <input placeholder="confirm password" className="register-input" />
            <button className="register-button">Sign up</button>
            <button className="register-login-button">Log into account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
