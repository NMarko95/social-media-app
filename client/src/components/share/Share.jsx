import "./share.css";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LabelIcon from "@mui/icons-material/Label";
import PlaceIcon from "@mui/icons-material/Place";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

const Share = () => {
  return (
    <div className="share">
      <div className="share-wrapper">
        <div className="share-top">
          <img
            src="/assets/person/1.jpeg"
            alt=""
            className="share-profile-image"
          />
          <input
            className="share-input"
            placeholder="Share what's on your mind..."
          />
        </div>
        <hr className="share-hr" />
        <div className="share-bottom">
          <div className="share-options">
            <div className="share-option">
              <PermMediaIcon
                style={{ color: "tomato" }}
                className="share-icon"
              />
              <span className="share-option-text">Photo or Video</span>
            </div>
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
        </div>
        <button className="share-btn">Share</button>
      </div>
    </div>
  );
};

export default Share;
