import React from 'react'
import useConversation from '../StateManage/useConversation'
import Loading from '../Components/Loading'
import { useSocketContext } from '../Context/SocketContext'

const Chat = () => {
  const { selectedConversation } = useConversation()
  const { onlineUsers } = useSocketContext()
  const getOnlineUserStatus = (userId) => {
    return onlineUsers.includes(userId)?"online":"offline"
  }
  console.log(selectedConversation)
  return (
    <div>
      <div className='bg-green-500'>
        <div className='flex flex-row space-x-4 px-6 py-4 items-center'>
          <div className={`avatar ${getOnlineUserStatus(selectedConversation._id)}`}>
            <div className="w-14 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <div className='flex flex-col items-start justify-center'>
            <div className='text-black'>
              <h1>{selectedConversation.name}</h1>
            </div>
            <div className='text-black'>
              <h1 className='text-sm'>{getOnlineUserStatus(selectedConversation._id)}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
