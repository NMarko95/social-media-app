import "./register.css";
import { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import ClearIcon from "@mui/icons-material/Clear";

const Register = () => {
  const [coverPicture, setCoverPicture] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const confirmRef = useRef();

  const readFileDataAsBase64 = (e) => {
    const currentFile = e.target.files[0];

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(currentFile);

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (err) => {
        reject(err);
      };
    });
  };

  const handleUploadFile = (e, profile) => {
    readFileDataAsBase64(e).then((data) => {
      if (profile) setProfilePicture(data);
      else setCoverPicture(data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = usernameRef.current.value;
    const confirm = confirmRef.current.value;
    if (password !== confirm) {
      console.log("Passwords do not match!");
      return;
    }
    const user = {
      username,
      email,
      password,
      profilePicture: profilePicture || "",
      coverPicture: coverPicture || "",
      desc: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga voluptate ullam obcaecati non provident dolorum.",
      city: "Nis",
    };
    try {
      await axios.post("http://localhost:8800/api/auth/register", user);
      window.location.replace("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register">
      <div className="register-text">
        <h3 className="register-logo">SocialMedia</h3>
        <p className="register-desc">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga
          voluptate ullam obcaecati non provident dolorum.
        </p>
      </div>
      <div className="register-wrapper">
        <div className="register-left">
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
            <Link to="/login">
              <button className="register-login-button">
                Log into account
              </button>
            </Link>
          </form>
        </div>
        <div className="profile-picture-container">
          <label htmlFor="profile-picture" className="register-container-label">
            <span className="register-container-text">Profile picture</span>
            <AddAPhotoIcon className="register-container-icon" />
            <input
              type="file"
              id="profile-picture"
              className="profile-picture-input"
              accept={".png, .jpg, .peg"}
              style={{ display: "none" }}
              onChange={(e) => handleUploadFile(e, true)}
            />
          </label>
          {profilePicture && (
            <>
              <img
                src={profilePicture}
                alt=""
                className="register-container-picture"
              />
              <ClearIcon
                className="remove-icon"
                onClick={() => setProfilePicture(null)}
              />
            </>
          )}
        </div>
        <div className="cover-picture-container">
          <label htmlFor="cover-picture" className="register-container-label">
            <span className="register-container-text">Cover picture</span>
            <AddAPhotoIcon className="register-container-icon" />
            <input
              type="file"
              id="cover-picture"
              className="profile-picture-input"
              style={{ display: "none" }}
              accept={".png, .jpg, .peg"}
              onChange={(e) => handleUploadFile(e, false)}
            />
          </label>
          {coverPicture && (
            <>
              <img
                src={coverPicture}
                alt=""
                className="register-container-picture"
              />
              <ClearIcon
                className="remove-icon"
                onClick={() => setCoverPicture(null)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
