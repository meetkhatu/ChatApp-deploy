import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useAuth } from '../Context/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';


const LogIn = () => {

  const [authUser, setAuthUser] = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const userInfo = {
      email: data.email,
      password: data.password
    }
    await axios.post("http://localhost:5002/user/login", userInfo,{
      withCredentials: true  
    })
      .then((response) => {
        console.log(response.data)
        if (response.data) {
          toast.success("Login successful!")
        }

        localStorage.setItem('messenger', JSON.stringify(response.data))
        setAuthUser(response.data)
        window.location.href = '/'
      })
      .catch((error) => {
        console.log(error)
        if (error.response) {
          toast.error("Error: " + error.response.data.message)
        }
      })
  }

  return (
    <div className='flex h-screen w-full bg-green-300 mx-auto items-center justify-center'>
      <div className="bg-white text-black w-auto h-auto p-20 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <div className='text-4xl font-extrabold'>
          MyChat
        </div>
        <div className='text-xl font-light mb-5'>
          Log In with your Account
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email">Email</label>
            <input type="email" {...register("email", { required: true })} className='border p-1 border-black/70 focus:outline-none focus:border-blue-500 rounded-md bg-green-100' />
            {errors.email && <span className='text-red-500 text-sm font-semibold'>**This field is required**</span>}
            <label htmlFor="password">Password</label>
            <input type="password" {...register("password", { required: true })} className='border p-1 border-black/70 focus:outline-none focus:border-blue-500 rounded-md bg-green-100' />
            {errors.password && <span className='text-red-500 text-sm font-semibold'>**This field is required**</span>}
            <button type='submit' className='mt-4 border rounded-lg p-1 font-semibold hover:bg-green-600 bg-green-400'>Log In</button>
            <p className='text-center'>
              Do not have an account?
              <Link to='/signup' className='text-blue-800 underline cursor-pointer hover:text-blue-950'>
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LogIn;
