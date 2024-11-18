import React, { useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'
import toast from 'react-hot-toast'

const Logout = () => {

  const [loading,setLoading] = useState(false) 
  
  const handleLogout = async () => {
    setLoading(true)
    try{
      const response = await axios.post('http://localhost:5002/user/logout')
      localStorage.removeItem('messenger')
      Cookies.remove('jwt')
      setLoading(false)
      toast.success("Logged Out Succesfully")
      window.location.href = '/'
    } catch(error) {
      console.log(error)
      toast.error("Failed to Log Out")
    }
  }

  return (
    <div className='absolute right-0 top-0 m-4'>
      <button onClick={handleLogout} className="btn btn-error">Logout</button>
    </div>
  )
}

export default Logout
