import "./userInfo.css"
import { useUserStore } from "../../../lib/userStore";
import { auth} from "../../../lib/firbase";
import { IoIosLogOut } from "react-icons/io";
import { signOut } from "firebase/auth";
const UserInfo = () => {
    const {currentUser}=useUserStore();
    return (
        <div className="userInfo">
  <div className="left">
    <img src={currentUser?.avatar || "./avatar.png"} alt="" />
    <h2>{currentUser?.username}</h2>
  </div>

  <button className="logout" onClick={() => signOut(auth)}>
    <IoIosLogOut />
  </button>
</div>

    )

}
export default UserInfo;