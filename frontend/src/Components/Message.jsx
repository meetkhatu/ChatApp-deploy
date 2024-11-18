import React from 'react'

const Message = ({ message }) => {
    const authUser = JSON.parse(localStorage.getItem('messenger'))
    const itsme = message.senderId === authUser.user._id
    const chatName = itsme? 'chat-end': 'chat-start'
    const chatColor = itsme? 'bg-green-400': 'bg-green-100'
    const createdAt = new Date(message.createdAt)
    const formattedTime = createdAt.toLocaleTimeString([],{
        hour: '2-digit',
        minute: '2-digit'
    })
    return (
        <>
            <div className={`chat ${chatName}`}>
                <div className={`chat-bubble ${chatColor} text-black`}>{message.message}</div>
                <div className="chat-footer opacity-50"><time className="text-xs text-black">{formattedTime}</time></div>
            </div>
        </>
    )
}

export default Message
