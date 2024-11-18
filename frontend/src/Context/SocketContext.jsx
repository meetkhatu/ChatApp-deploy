import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from './AuthProvider'
import io from 'socket.io-client'


const socketContext = createContext()

export const useSocketContext = () => {
    return useContext(socketContext)
}


export const SocketProvider = ({ children }) => {
    const [onlineUsers, setOnlineUsers] = useState([])
    const [socket, setSocket] = useState(null)
    const [authUser] = useAuth()

    useEffect(() => {
        if (authUser) {
            const socket = io('http://localhost:5002/', {
                query: {
                    userId: authUser.user._id
                }
            })
            setSocket(socket)

            socket.on('getOnline', (users) => {
                setOnlineUsers(users)
                console.log("Socket Disconnected")
            })
            return () => socket.close()
        }
        else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])

    return (
        <socketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </socketContext.Provider>
    )
}