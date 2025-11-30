import { useState } from 'react';
import './login.css'
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db, FIREBASE_COLLECTIONS, FIREBASE_FIELDS } from '../../lib/firbase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const Login =()=>
{
    const [avtar,setAvtar]=useState({file:null,url:""})
    const [loading, setLoading] = useState(false) 
    const handleAvtar=e=>{
        setAvtar({
            file:e.target.files[0],
            url:URL.createObjectURL(e.target.files[0])        })
    }

    const handleLogin= async (e) =>{
        setLoading(true);
        e.preventDefault()
        const formData=new FormData(e.target)
        const {email,password}= Object.fromEntries(formData);
        try{
            const cred = await signInWithEmailAndPassword(auth,email,password)
           
            const uid = cred.user?.uid
            if (uid) {
                const userRef = doc(db, FIREBASE_COLLECTIONS.USERS, uid)
                const snap = await getDoc(userRef)
                if (!snap.exists()) {
                    await setDoc(userRef, {
                        [FIREBASE_FIELDS.USERNAME]: email.split('@')[0],
                        [FIREBASE_FIELDS.EMAIL]: email,
                        [FIREBASE_FIELDS.AVATAR]: '',
                        [FIREBASE_FIELDS.UID]: uid,
                        [FIREBASE_FIELDS.BLOCKED]: [],
                    })
                    await setDoc(doc(db, FIREBASE_COLLECTIONS.USER_CHATS, uid), { [FIREBASE_FIELDS.CHATS]: [] })
                }
            }
            toast.success('Login successful!')
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
        finally{
            setLoading(false)
        }
    }
    const handleRegister= async (e) =>{
        e.preventDefault()
        const formData=new FormData(e.target)
        const {username,email,password}= Object.fromEntries(formData);
        try{
            const userCredential= await createUserWithEmailAndPassword(auth,email,password)
            await setDoc(doc(db, FIREBASE_COLLECTIONS.USERS, userCredential.user.uid), {
                [FIREBASE_FIELDS.USERNAME]: username,
                [FIREBASE_FIELDS.EMAIL]: email,
                [FIREBASE_FIELDS.AVATAR]: avtar.url || '',
                [FIREBASE_FIELDS.UID]: userCredential.user.uid,
                [FIREBASE_FIELDS.BLOCKED]:[],
            });
            await setDoc(doc(db, FIREBASE_COLLECTIONS.USER_CHATS, userCredential.user.uid), {
               [FIREBASE_FIELDS.CHATS]:[],
            });
            
         
            
            toast.success('Account created successfully!')
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
     
    }
       return (
        <div className="login">
            <div className='item'>
                <h2>Welcome Back</h2>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder='Email' name='email'/>
                    <input type="password" placeholder='Password' name='password' />
                    <button disabled={loading}>Sign in</button>
                </form>
            </div>
            <div className="seprator"></div>
            <div className="item">
            <h2>Create an account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file"> <img src={avtar.url||"./avtar.png"} alt="" />
                     Upload an image</label>
                   <input type="file" id="file" style={{display:'none'}} onChange={handleAvtar}/>
                    <input type="text" placeholder='Username' name='username'/>
                    <input type="email" placeholder='Email' name='email'/>
                    <input type="password" placeholder='Password' name='password' />
                    <button disabled={loading}>Sign up</button>
                </form>
            </div>
        </div>
    )
}
export default Login;