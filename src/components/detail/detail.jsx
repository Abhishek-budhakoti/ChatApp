 import "./detail.css";
 import { auth } from "../../lib/firbase";
 import { signOut } from "firebase/auth";

 const Detail =()=>
{
    return(
        <div className="detail">
           <div className="user">
            <img src="./avtar.png" alt="" />
            <h2>jhone Doe</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, veniam.</p>
           </div>
           <div className="info">
            <div className="options">
                <div className="title">
                    <span>chat Setting</span>
                
                </div>
            </div>
            <div className="options">
                <div className="title">
                    <span>Privacy % Help</span>
                
                </div>
            </div>
            <div className="options">
                <div className="title">
                    <span>Shared Photos</span>
                
                </div>
                <div className="photos">
                    <div className="photoItem">
                        <div className="photoDetail">
                        <img src="./avtar.png" alt="" />
                        <span>photo_2024_2.png</span>
                        </div>
                    
                    <img src="" alt="download.png" />
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
            <button>Block User</button>
            <button className="logout" onClick={() => signOut(auth)}>Logout</button>

           </div>
        </div>
    )
}
export default Detail;