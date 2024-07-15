
import { useSelector } from 'react-redux'
import { useRef,useState,useEffect } from 'react';
import {getStorage, ref,uploadBytesResumable, getDownloadURL,} from "firebase/storage";

import {app} from "../firebase";
const Profile = () => {
  const fileRef = useRef(null);
  const [image ,setImage] = useState(undefined);
  const {currentUser} = useSelector(state => state.user);
  const [imagePercent , setImagePercent] = useState(0);
  const [imageError ,setImageError]=useState(false);
  const [formData, setFormData] = useState({});
  
  console.log(imagePercent);
  useEffect(()=>{
    if(image){
handleFileUpload(image);
    }
  },[image]);

  const handleFileUpload = async(image)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage,fileName);
    const uploadTask = uploadBytesResumable(storageRef,image);
    uploadTask.on(
      'state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('upload is'+ progress +'% done');
        setImagePercent(Math.round(progress));
      }
    );
    (error)=>{
     setImageError(true);
    }
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
            setFormData({...FormData,profilePicture:downloadURL})
      })
    }

    }
  return (
    <div className='bg-black h-screen '>
     <div className='text-white p-3 max-w-lg mx-auto'>
     <h1 className='text-4xl font-bold text-center py-10'>Profile</h1>
      <form action="" className='flex flex-col gap-8'>


        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=> setImage(e.target.files[0])} />
        <img src={currentUser.profilePicture} onClick={()=> fileRef.current.click()}  alt="@dued" className='h-32 w-32 border border-dashed rounded-full self-center cursor-pointer object-cover' />
  <p className='text-sm self-center'>
    {
      imageError?(<span className='text-red-600'>Error Uploading image (file size must be 2 MB)</span>): imagePercent > 0 && imagePercent < 100 ? (
        <span className='text-green-700'>{`uploading: ${imagePercent} '%'`}</span>) : imagePercent === 100 ? (
          <span className='text-green-700'>Image uploaded Successfully</span>) :''}
        
      
    
  </p>



        <input type="text" defaultValue={currentUser.username} id='username' placeholder='UserName' className='bg-slate-100 rounded-lg text-black p-3' />
        <input type="email" defaultValue={currentUser.email} id='email' placeholder='Email' className='bg-slate-100 text-black rounded-lg p-3' />
        <input type="password" id='password' placeholder='Password' className='bg-slate-100 rounded-lg text-black p-3' />
        <button className='bg-sky-600 p-3 rounded-lg uppercase hover:opacity-85 duration-150 disabled:opacity-80'>Update</button>
      </form>
      <div className='py-5 flex justify-between'>
    <span className='text-red-700 text-xl cursor-pointer'>Delete Account</span>
    <span className=' text-xl cursor-pointer'>Sign Up</span>
      </div>
     </div>
    </div>
  )
}

export default Profile
