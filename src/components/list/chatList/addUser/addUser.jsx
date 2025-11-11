import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    serverTimestamp,
    doc,
    arrayUnion,
  } from "firebase/firestore";
  import "./addUser.css";
  import { db } from "../../../../lib/firbase";
  import { useState } from "react";
  import { useUserStore } from "../../../../lib/userStore"; 
  import { toast } from "react-toastify"; // ✅ import toast
  
  const AddUser = () => {
    const [user, setUser] = useState(null);
    const currentUser = useUserStore((state) => state.currentUser);
  
    // 🔍 Search user by username
    const handleSearch = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const username = formData.get("username").trim();
  
      if (!username) {
        toast.warning("Please enter a username");
        return;
      }
  
      try {
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", username));
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          const foundUser = {
            id: querySnapshot.docs[0].id,
            ...querySnapshot.docs[0].data(),
          };
          setUser(foundUser);
        } else {
          setUser(null);
          toast.error("No user found 🚫");
        }
      } catch (error) {
        console.error("Error searching user:", error);
        toast.error("Something went wrong while searching ❌");
      }
    };
  
    // ➕ Create chat and update userChats
    const handleAdd = async () => {
      if (!user || !currentUser) return;
  
      try {
        // 1️⃣ Create new chat doc in "chats"
        const newChatRef = doc(collection(db, "chats"));
        await setDoc(newChatRef, {
          createdAt: serverTimestamp(),
          messages: [],
        });
  
        // 2️⃣ Update or create "userChats" for currentUser
        const currentUserChatRef = doc(db, "userChats", currentUser.uid);
        await setDoc(
          currentUserChatRef,
          {
            chats: arrayUnion({
              chatId: newChatRef.id,
              receiverId: user.id,
              updatedAt: Date.now(),
            }),
          },
          { merge: true }
        );
  
        // 3️⃣ Update or create "userChats" for the other user
        const otherUserChatRef = doc(db, "userChats", user.id);
        await setDoc(
          otherUserChatRef,
          {
            chats: arrayUnion({
              chatId: newChatRef.id,
              receiverId: currentUser.uid,
              updatedAt: Date.now(),
            }),
          },
          { merge: true }
        );
  
        console.log("✅ Chat created:", newChatRef.id);
        toast.success("Chat successfully created 🎉");
        setUser(null); // clear after adding
      } catch (err) {
        console.error("Error creating chat:", err);
        toast.error("Failed to create chat ❌");
      }
    };
  
    return (
      <div className="addUser">
        <form onSubmit={handleSearch}>
          <input type="text" placeholder="Username" name="username" />
          <button type="submit">Search</button>
        </form>
  
        {user && (
          <div className="user">
            <div className="detail">
              <img src={user.avatar || "./avtar.png"} alt="avatar" />
              <span>{user.username}</span>
            </div>
            <button onClick={handleAdd}>Add User</button>
          </div>
        )}
      </div>
    );
  };
  
  export default AddUser;
  