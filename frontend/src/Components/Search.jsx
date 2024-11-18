import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import useGetAllUsers from '../Context/useGetAllUsers'
import useConversation from '../StateManage/useConversation'
import toast from 'react-hot-toast'


const Search = () => {

  const [search, setSearch] = useState('')
  const [allUsers] = useGetAllUsers()
  const { setSelectedConversation } = useConversation()
  console.log(allUsers)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!search) return;
    const conversation = allUsers.find((user) => 
      user.name?.toLowerCase().includes(search.toLowerCase()));
    if (conversation) {
      setSelectedConversation(conversation)
      setSearch('')
    } else{
      toast.error('User Not Found!')
    }
    }
  
  return (
    <div className='w-full text-black mb-5'>
      <form onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='px-1 h-10 bg-white border border-r-white border-l-black border-t-black border-b-black rounded-l-lg w-[80%] focus:outline-none' placeholder='Search Friend' />
        <button type='submit' className='bg-white rounded-r-lg h-10 px-1 translate-y-[12.7px] border border-l-white border-t-black border-b-black border-r-black'><FaSearch /></button>
      </form>
    </div>
  )
}

export default Search
