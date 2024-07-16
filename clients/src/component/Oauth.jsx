import React from "react";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import {useNavigate} from "react-router-dom";
const Oauth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth,provider);
      // console.log(result);
      const res = await fetch('/api/auth/google',{
        method :'POST',
        headers:{
          'content-Type' :'application/json',
        },
        body:JSON.stringify({
          name:result.user.displayName, //Fetching Name from Google email
          photo:result.user.photoURL,   //Fetching photoUrl from google email
          email:result.user.email   //Fetching google email
        }),

      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      // console.log(data);
      navigate('/');
    } catch (error) {
      console.log("Could not login with goggle", error);
    }
  };
  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleClick}
        className="bg-red-700 p-2 w-full hover:opacity-95  duration-300 rounded-md my-2 text-white"
      >
        Continue With Google
      </button>
    </div>
  );
};

export default Oauth;
