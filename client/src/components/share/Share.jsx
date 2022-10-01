import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import PlaceIcon from "@mui/icons-material/Place";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef } from "react";
import { useState } from "react";
import axios from "axios";

const Share = ({ posts, setPosts }) => {
  const { user } = useContext(AuthContext);

  const descRef = useRef();

  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleUploadFile = (e) => {
    readFileDataAsBase64(e).then((data) => {
      setSelectedImage(data);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: descRef.current.value,
      image: selectedImage,
    };
    try {
      await axios.post("http://localhost:8800/api/posts", newPost);
      const newPosts = [...posts, { ...newPost, likes: [] }];
      setPosts(newPosts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img
            src={user.profilePicture || "/assets/avatar.jpg"}
            alt=""
            className="share-profile-image"
          />
          <input
            ref={descRef}
            className="share-input"
            placeholder={`Share what's on your mind ${user.username}...`}
          />
        </div>
        <hr className="share-hr" />
        <form className="share-bottom">
          <div className="share-options">
            <label htmlFor="file" className="share-option">
              <PermMediaIcon
                style={{ color: "tomato" }}
                className="share-icon"
              />
              <span className="share-option-text">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={handleUploadFile}
              />
            </label>
            <div className="share-option">
              <LabelIcon style={{ color: "blue" }} className="share-icon" />
              <span className="share-option-text">Tag</span>
            </div>
            <div className="share-option">
              <PlaceIcon style={{ color: "green" }} className="share-icon" />
              <span className="share-option-text">Location</span>
            </div>
            <div className="share-option">
              <EmojiEmotionsIcon
                style={{ color: "goldenrod" }}
                className="share-icon"
              />
              <span className="share-option-text">Feelings</span>
            </div>
          </div>
        </form>
        <button onClick={handleSubmit} className="share-btn">
          Share
        </button>
      </div>
    </div>
  );
};

export default Share;
