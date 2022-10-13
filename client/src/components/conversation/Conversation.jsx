import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./conversation.css";

const Conversation = ({ conversation }) => {
  const { user: currentUser } = useContext(AuthContext);

  const [user, setUser] = useState(null);

  const friendId = conversation.members.find(
    (member) => currentUser._id !== member
  );

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/users?userId=${friendId}`
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, [friendId]);

  return (
    <div className="conversation">
      <img
        src={user?.profilePicture || "/assets/avatar.jpg"}
        alt=""
        className="conversation-img"
      />
      <span className="conversation-name">{user?.username}</span>
    </div>
  );
};

export default Conversation;
