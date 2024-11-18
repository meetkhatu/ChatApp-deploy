import React from 'react'
import Search from '../Components/Search'
import Users from './Users'
const Left = () => {
  return (
    <div className='bg-green-100 w-[35%] h-screen border'>
      <div className='mt-5 text-center px-1'>
        <h1 className='text-black mx-3 mb-5 text-6xl font-extrabold p-2 '>
          Chats
        </h1>
      <Search />
      <Users />
      </div>
    </div>
  )
}

export default Left
