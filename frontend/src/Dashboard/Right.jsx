import React, { useEffect } from 'react'
import Logout from '../Components/Logout'
import ChatUser from '../Components/ChatUser'
import Messages from './Messages'
import Type from '../Components/Type'
import useConversation from '../StateManage/useConversation'
import Loading from '../Components/Loading'

const Right = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  useEffect(() => {
    return setSelectedConversation(selectedConversation)
  },[selectedConversation])
  return (
    <div className='bg-green-200 w-[65%] h-screen border'>
        <Logout />
        {
          selectedConversation
          ?
          (
          <div className='mt-[100px] flex flex-col'>
        <ChatUser />
        <Messages />
        <Type />
        </div>
        )
        :
        (<div></div>)
        }
    </div>
  )
}

export default Right
