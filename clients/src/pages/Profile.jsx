import { useDispatch, useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

import { app } from "../firebase";
import { deleteUser } from "../../../controllers/user.controller";
const Profile = () => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess , setUpdateSuccess] = useState(false);
  
  const { currentUser,loading,error } = useSelector((state) => state.user);

  console.log(imagePercent);
  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("upload is " + progress + "% done");
        setImagePercent(Math.round(progress));
      },  
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, profilePicture: downloadURL }));
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      //fetch("requesting to server user path here",{})
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  // console.log(formData);
  const handleDeleteAccount = async()=>{
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data = await res.json();
        if(data.success === false){
          return;
          dispatch(deleteUserFailure(data));
        }
        dispatch(deleteUserSuccess(data));
      
    } catch (error) {
      dispatch(deleteUserFailure(data));
    }
  }
  return (
    <div className="bg-black h-screen ">
      <div className="text-white p-3 max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-center py-10">Profile</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <img
            src={formData.profilePicture || currentUser.profilePicture}
            onClick={() => fileRef.current.click()}
            alt="@dued"
            className="h-32 w-32 border border-dashed rounded-full self-center cursor-pointer object-cover"
          />
          <p className="text-sm self-center">
            {imageError ? (
              <span className="text-red-600">
                Error Uploading image (file size must be 2 MB)
              </span>
            ) : imagePercent > 0 && imagePercent < 100 ? (
              <span className="text-green-700">{`uploading: ${imagePercent} '%'`}</span>
            ) : imagePercent === 100 ? (
              <span className="text-green-700">
                Image uploaded Successfully
              </span>
            ) : (
              ""
            )}
          </p>

          <input
            type="text"
            defaultValue={currentUser.username}
            id="username"
            placeholder="UserName"
            className="bg-slate-100 rounded-lg text-black p-3"
            onChange={handleChange}
          />
          <input
            type="email"
            defaultValue={currentUser.email}
            id="email"
            placeholder="Email"
            className="bg-slate-100 text-black rounded-lg p-3"
            onChange={handleChange}
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="bg-slate-100 rounded-lg text-black p-3"
            onChange={handleChange}
          />
          <button className="bg-sky-600 p-3 rounded-lg uppercase hover:opacity-85 duration-150 disabled:opacity-80">
           {loading ? 'Loading...':'Update'}
          </button>
        </form>
        <div className="py-5 flex justify-between">
          <span onClick={handleDeleteAccount} className="text-red-700 text-xl cursor-pointer">
            Delete Account
          </span>
          <span className=" text-xl cursor-pointer">Sign Up</span>
        </div>
        <p className="text-red-600">{error && 'something Went Wrong!!'}</p>
        <p className="text-green-600">{error && 'User is updated successfully!'}</p>
      </div>
    </div>
  );
};

export default Profile;
