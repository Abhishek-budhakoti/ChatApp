import "./userInfo.css"
import { BsThreeDots, BsCameraVideoFill } from "react-icons/bs";
import { TbEdit } from "react-icons/tb";
const UserInfo = () => {
    return (
        <div className="userInfo">
            <div className="user">
                <img src="./avtar.png" alt="" />
                <h2>jhone doe</h2>
            </div>
            <div className="icons">
                <BsThreeDots />
                <BsCameraVideoFill />
                <TbEdit />
            </div>
        </div>
    )

}
export default UserInfo;