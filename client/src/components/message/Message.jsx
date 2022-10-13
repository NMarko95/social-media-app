import "./message.css";
import { format } from "timeago.js";

const Message = ({ message, own }) => {
  return (
    <div className={`${own ? "message own" : "message"}`}>
      <div className="message-top">
        <img className="message-img" src="/assets/avatar.jpg" alt="" />
        <p className="message-text">{message.text}</p>
      </div>
      <div className="message-bottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
