import "./chat.css";
import Emojipicker from "emoji-picker-react"
import { FaInfoCircle, FaPhoneAlt, FaRegImage, FaMicrophone } from "react-icons/fa";
import { BsCameraVideoFill } from "react-icons/bs";
import { IoIosCamera } from "react-icons/io";
import { MdEmojiEmotions } from "react-icons/md";
import { useState } from "react";


const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("")
    const handleEmoji = (e) => {
        setText(prev => prev + e.emoji);
    }
    return (
        <div className="chat">
            <div className="top">
                <div className="user">
                    <img src="./avtar.png" alt="" />
                    <div className="text">
                        <span>jhane doe</span>
                        <p>Lorem, ipsum dolor sit am?</p>

                    </div>
                </div>
                <div className="icons">
                    <FaPhoneAlt />
                    <BsCameraVideoFill />
                    <FaInfoCircle />



                </div>
            </div>
            <div className="center">
                <div className="message">
                    <img src="./avtar.png" alt="" />
                    <div className="text">
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, qui maxime? Itaque laboriosam, quidem id temporibus voluptates corrupti nam corporis?

                        </p>
                        <span> 1 min ago</span>

                    </div>

                </div>
                <div className="message own">
                  
                    <div className="text">
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspercldhfjhdfhsdklafhklsdfhklsdhfkdfhksdhfknatur, qui maxime? Itaque laboriosam, quidem id temporibus voluptates corrupti nam corporis?

                        </p>
                        <span> 1 min ago</span>

                    </div>

                </div>
                <div className="message">
                    <img src="./avtar.png" alt="" />
                    <div className="text">
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, qui maxime? Itaque laboriosam, quidem id temporibus voluptates corrupti nam corporis?

                        </p>
                        <span> 1 min ago</span>

                    </div>

                </div>
                <div className="message own">
                  
                    <div className="text">
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, qui maxime? Itaque laboriosam, quidem id temporibus voluptates corrupti nam corporis?

                        </p>
                        <span> 1 min ago</span>

                    </div>

                </div>
                <div className="message">
                    <img src="./avtar.png" alt="" />
                    <div className="text">
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, qui maxime? Itaque laboriosamnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnnn, quidem id temporibus voluptates corrupti nam corporis?

                        </p>
                        <span> 1 min ago</span>

                    </div>

                </div>
                <div className="message own">
                  
                    <div className="text">
                        <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, qui maxime? Itaque laboriovvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvsam, quidem id temporibus voluptates corrupti nam corporis?

                        </p>
                        <span> 1 min ago</span>

                    </div>

                </div>


            </div>
            <div className="bottom">
                <div className="icons">
                    <FaRegImage />
                    <IoIosCamera />
                    <FaMicrophone />

                </div>
                <input type="text" placeholder="Type a message....." value={text} onChange={e => { setText(e.target.value) }} />
                <div className="emoji">
                    <MdEmojiEmotions onClick={() => setOpen((prev) => !prev)} />
                    <div className="picker">
                        <Emojipicker open={open} onEmojiClick={handleEmoji} />
                    </div>

                    <div>

                    </div>

                </div>
                <button className="send-button">Send</button>
            </div>

        </div>
    )
}
export default Chat;