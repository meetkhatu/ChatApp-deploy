import React, { useState } from 'react'
import { IoIosSend } from "react-icons/io";
import useSendMessage from '../Context/useSendMessage';

const Type = () => {

  const { loading, sendMessages } = useSendMessage()
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await sendMessages(message)
    setMessage('')
  }
  return (

    <div className="flex w-full px-4">
      <form className='flex w-full ' onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => { setMessage(e.target.value) }}
          placeholder="Type here"
          className="bg-slate-400 grow placeholder:text-black text-black input input-bordered w-full"
        />
        <button className="ml-2">
          <IoIosSend size={50} color="gray" />
        </button>
      </form>
    </div>
  )
}

export default Type
