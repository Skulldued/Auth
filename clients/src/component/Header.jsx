import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Header = () => {
  const {currentUser} = useSelector(state =>state.user)
  return (
    <div className='bg-slate-200'>
      <div className='flex justify-evenly items-center py-2 px-20'>
      <Link to="/">
        <h1 className='font-bold'>Auth App</h1>
        </Link>
        <ul className='flex gap-8'>
             <Link to="/"> <li>Home</li></Link>
             <Link to="/about"> <li>About</li></Link>
             <Link to="/profile">
              {
                currentUser ? (
                  <img src={currentUser.profilePicture} className='h-7 w-7 rounded-full object-cover' alt="" />
                ):(
                  <li>Sign In</li>
                )
              }
              </Link>
        </ul>
      </div>
    </div>
  )
}

export default Header
