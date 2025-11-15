import "./chat.css";
import Emojipicker from "emoji-picker-react";
import { FaInfoCircle, FaPhoneAlt, FaRegImage, FaMicrophone } from "react-icons/fa";
import { BsCameraVideoFill } from "react-icons/bs";
import { IoIosCamera } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firbase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const { currentUser } = useUserStore();
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();

  const endRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  // Listen to chat updates
  useEffect(() => {
    if (!chatId) return;
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => unSub();
  }, [chatId]);

  // Add emoji
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

  // Send message
  const handleSend = async () => {
    if (text.trim() === "") return;

    try {
      // 1. Update messages in chats collection
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.uid,
          text,
          createdAt: Date.now(),
        }),
      });

      // 2. Update userChats for both users
      const userIds = [currentUser.uid, user.id];

      userIds.forEach(async (id) => {
        const userChatRef = doc(db, "userChats", id);
        const userChatsSnapshot = await getDoc(userChatRef);

        if (userChatsSnapshot.exists()) {
          const userChatData = userChatsSnapshot.data();
          const chats = userChatData.chats || [];

          const chatIndex = chats.findIndex((c) => c.chatId === chatId);

          if (chatIndex !== -1) {
            // Update existing chat
            chats[chatIndex].lastMessage = text;
            chats[chatIndex].isSeen = id === currentUser.uid ? true : false;
            chats[chatIndex].updatedAt = Date.now();
          } else {
            // Create new chat entry
            chats.push({
              chatId,
              lastMessage: text,
              isSeen: id === currentUser.uid,
              updatedAt: Date.now(),
              receiverId: id === currentUser.uid ? user.id : currentUser.uid, // ✅ consistent
            });
          }

          await updateDoc(userChatRef, { chats });
        }
      });

      setText(""); // clear input
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chat">
      {/* Top Bar */}
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./avtar.png"} alt="avatar" />
          <div className="text">
            <span>{user?.username || "Unknown User"}</span>
            <p>Lorem ipsum dolor sit amet.
            </p>
          </div>
        </div>
        <div className="icons">
          <FaPhoneAlt />
          <BsCameraVideoFill />
          <FaInfoCircle />
        </div>
      </div>

      {/* Messages */}
      <div className="center">
        {chat?.messages?.map((message) => (
          <div
            className={`message ${
              message.senderId === currentUser.uid ? "own" : ""
            }`}
            key={message.createdAt}
          >
            <div className="text">
              {message.img && <img src={message.img} alt="attachment" />}
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* Bottom Input */}
      <div className="bottom">
        <div className="icons">
          <FaRegImage />
          <IoIosCamera />
          <FaMicrophone />
        </div>
        <input
          type="text"
          placeholder=  {isCurrentUserBlocked || isReceiverBlocked  ? "You cannot type a message" : "Type a message..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji">
          <MdEmojiEmotions onClick={() => setOpen((prev) => !prev)} />
          {open && (
            <div className="picker">
              <Emojipicker open={open} onEmojiClick={handleEmoji} />
            </div>
          )}
        </div>
        <button className="send-button" onClick={handleSend} disabled={isCurrentUserBlocked || isReceiverBlocked}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
