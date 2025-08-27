import { useState } from "react";
import "./chatList.css"
import { FaSearch, FaPlus, FaMinus } from "react-icons/fa";
const ChatList = () => {
    const [addMode, setAddMode] = useState(false)
    const Icon = addMode ? FaMinus : FaPlus;
    return (
        <div className="chatList">
            <div className="search">
                <div className="searchBar">
                    <FaSearch />
                    <input type="text" placeholder="search" />

                </div>


                <Icon
                    className="add"
                    onClick={() => setAddMode((prev) => !prev)}
                />

            </div>


            <div className="items">
                <img src="./avtar.png" alt="" />
                <div className="text">
                    <span>jane doe</span>
                    <p>hello</p>

                </div>
            </div>

            <div className="items">
                <img src="./avtar.png" alt="" />
                <div className="text">
                    <span>jane doe</span>
                    <p>hello</p>

                </div>
            </div>
            <div className="items">
                <img src="./avtar.png" alt="" />
                <div className="text">
                    <span>jane doe</span>
                    <p>hello</p>

                </div>
            </div>
            

        </div>

    )

}
export default ChatList;