import React from 'react'
import useConversation from '../StateManage/useConversation'
import {useSocketContext} from '../Context/SocketContext'
const User = ({ user }) => {

    const { onlineUsers, socket } = useSocketContext()
    const isOnline = onlineUsers.includes(user._id)
    const {selectedConversation, setSelectedConversation} = useConversation()
    const isSelected = selectedConversation?selectedConversation._id===user._id:null
    return (
        <div onClick={()=>setSelectedConversation(user)} className={`flex space-x-4 px-6 py-7 hover:bg-green-300 duration-300 rounded-lg cursor-pointer ${isSelected?"bg-green-300":""}`}>
            <div className={`avatar ${isOnline? `online`: `offline`}`}>
                <div className="w-14 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
            </div>

            <div className='flex flex-col items-start justify-center'><div className='text-black items-start'>
                <h1>{user.name}</h1>
            </div>
            <div className='text-black items-start'>
                <h1>{user.email}</h1>
            </div>
            </div>
        </div>
    )
}

export default User
