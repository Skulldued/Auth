import React from 'react'
import { useSelector } from 'react-redux'
const Profile = () => {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className='bg-black h-screen '>
     <div className='text-white p-3 max-w-lg mx-auto'>
     <h1 className='text-4xl font-bold text-center py-10'>Profile</h1>
      <form action="" className='flex flex-col gap-8'>
        <img src={currentUser.profilePicture} alt="@dued" className='h-32 w-32 border border-dashed rounded-full self-center cursor-pointer object-cover' />
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
