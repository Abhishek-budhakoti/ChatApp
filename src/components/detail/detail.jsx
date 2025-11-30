import "./detail.css";
import { db, FIREBASE_COLLECTIONS, FIREBASE_FIELDS } from "../../lib/firbase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";


import { 
    doc, 
    updateDoc, 
    arrayRemove, 
    arrayUnion 
} from "firebase/firestore";

const Detail = () => {

    const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();

    const { currentUser, fetchUserInfo } = useUserStore();

    const handleBlock = async () => {
        if (!user || !currentUser || isCurrentUserBlocked) return;

        const userRef = doc(db, FIREBASE_COLLECTIONS.USERS, currentUser.uid);

        try {
            await updateDoc(userRef, {
                [FIREBASE_FIELDS.BLOCKED]: isReceiverBlocked
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

                <img src={user?.[FIREBASE_FIELDS.AVATAR] || "./avtar.png"} alt="" />
                <h2>{user?.[FIREBASE_FIELDS.USERNAME]}</h2>
              
           
                <p>Lorem ipsum dolor sit amet ectetur adipisicing elit.</p>
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

               
            </div>
        </div>
    );
};

export default Detail;
