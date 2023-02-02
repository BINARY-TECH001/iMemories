import React, { useState, useEffect } from 'react'
import './navbar.scss'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Navbar = () => {
   const [ user, setUser ] = useState(JSON.parse(localStorage.getItem('profile')))
   const dispatch = useDispatch()
   const history = useHistory()
   const location = useLocation()

   const logout = () => {
    dispatch({ type: 'LOGOUT' })
    history.push('/')
    setUser(null)
   }

   useEffect(()=>{
    const token = user?.token;

    // JWT FOR MANUAL SIGN UP

    setUser(JSON.parse(localStorage.getItem('profile')))
   }, [location])

  return (
    <div className="navbar">
     <Link to='/' className='link memories' > <span> iMemories </span> </Link>

     <div className="userInfo">
      {user ? (
        <div className="info">
          <img src={user.result.imageUrl} alt={user.result.name} />
          <h6> { user.result.name } </h6>
          <button onClick={logout}> Logout </button>
        </div>
      ) : (
        <div className="info">
          <Link to="/auth" className='link signin'> <button> Sign In </button> </Link>
        </div>
      )} 
     </div>
    </div>

  )
}

export default Navbar
