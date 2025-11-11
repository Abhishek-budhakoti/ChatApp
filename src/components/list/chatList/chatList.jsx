import { useEffect, useState } from "react";
import "./chatList.css";
import { FaSearch, FaPlus, FaMinus } from "react-icons/fa";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, onSnapshot, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firbase";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);

  const { currentUser } = useUserStore();
  const { changeChat } = useChatStore();

  useEffect(() => {
    if (!currentUser?.uid) return;

    // Listen to changes in userChats collection
    const unSub = onSnapshot(doc(db, "userChats", currentUser.uid), async (res) => {
      const items = res.data()?.chats || [];

      // Resolve each chat to include other user data
      const promises = items.map(async (item) => {
        try {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.exists() ? userDocSnap.data() : null;

          return { ...item, user };
        } catch (err) {
          console.error("Error loading chat user:", err);
          return { ...item, user: null };
        }
      });

      const chatData = await Promise.all(promises);

      // Sort by last updated
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => unSub();
  }, [currentUser?.uid]);

  // ✅ Select chat & mark as seen
  const handleSelect = async (chat) => {
    try {
      // Create a clean copy of chats without user object
      const userChats = chats.map((item) => {
        const { user, ...rest } = item;
        return rest;
      });

      // Find this chat
      const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId);

      if (chatIndex !== -1) {
        userChats[chatIndex].isSeen = true; // mark seen
      }

      // Update Firestore
      const userChatsRef = doc(db, "userChats", currentUser.uid);
      await updateDoc(userChatsRef, { chats: userChats });

      // Switch to chat
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.error("Error selecting chat:", error);
    }
  };

  const Icon = addMode ? FaMinus : FaPlus;

  return (
    <div className="chatList">
      {/* Search Bar */}
      <div className="search">
        <div className="searchBar">
          <FaSearch />
          <input type="text" placeholder="Search" />
        </div>
        <Icon className="add" onClick={() => setAddMode((prev) => !prev)} />
      </div>

      {/* Chats */}
      {chats.map((chat) => (
        <div
          className="items"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{ backgroundColor: chat?.isSeen ? "transparent" : "#cf7c235a" }}
        >
          <img src={chat.user?.avatar || "./avtar.png"} alt="avatar" />
          <div className="text">
            <span>{chat.user?.username || "Unknown User"}</span>
            <p>{chat.lastMessage || ""}</p>
          </div>
        </div>
      ))}

      {/* Add User Panel */}
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
