import "./detail.css";
import { auth, db } from "../../lib/firbase";
import { signOut } from "firebase/auth";

import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";

import { 
    doc, 
    updateDoc, 
    arrayRemove, 
    arrayUnion 
} from "firebase/firestore";

const Detail = () => {

    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
        useChatStore();

    const { currentUser, fetchUserInfo } = useUserStore();

    const handleBlock = async () => {
        if (!user || !currentUser || isCurrentUserBlocked) return;

        const userRef = doc(db, "users", currentUser.uid);

        try {
            await updateDoc(userRef, {
                blocked: isReceiverBlocked
                    ? arrayRemove(user.uid)
                    : arrayUnion(user.uid)
            });

            changeBlock();
            // Refresh currentUser to update the blocked array
            await fetchUserInfo(currentUser.uid);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="detail">
            <div className="user">
                <img src={user?.avatar || "./avatar.png"} alt="" />
                <h2>{user?.username}</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>

            <div className="info">
                <div className="options">
                    <div className="title">
                        <span>Chat Settings</span>
                    </div>
                </div>

                <div className="options">
                    <div className="title">
                        <span>Privacy & Help</span>
                    </div>
                </div>

                <div className="options">
                    <div className="title">
                        <span>Shared Photos</span>
                    </div>

                    <div className="photos">
                        <div className="photoItem">
                            <div className="photoDetail">
                                <img src="./avatar.png" alt="" />
                                <span>photo_2024_2.png</span>
                            </div>

                            <img src="./download.png" alt="download" />
                        </div>
                    </div>
                </div>

                <div className="options">
                    <div className="title">
                        <span></span>
                    </div>
                </div>

                <div className="options">
                    <div className="title">
                        <span>Shared Files</span>
                    </div>
                </div>

                <button 
                    onClick={handleBlock}
                    disabled={isCurrentUserBlocked || !user}
                >
                    {isCurrentUserBlocked ? "you are blocked" :isReceiverBlocked ? "User blocked" 
                    :"Block User"}
                </button>

                <button className="logout" onClick={() => signOut(auth)}>
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Detail;
