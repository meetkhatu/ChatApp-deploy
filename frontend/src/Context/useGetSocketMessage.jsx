import React, { useEffect } from 'react'
import { useSocketContext } from './SocketContext'
import useConversation from '../StateManage/useConversation'
import sound from '../Assets/Notif.mp3'

const useGetSocketMessage = () => {

    const { socket } = useSocketContext()
    const {messages,setMessages} = useConversation()

    useEffect(()=>{
        socket.on('newMessage', (newMessage) => {
            const notification = new Audio(sound)
            notification.play()
            setMessages([...messages, newMessage])
        })
        return() => {socket.off('newMessage')}
    },[socket,messages,setMessages])
}


export default useGetSocketMessage
