import React, { useState } from 'react'
import useConversation from '../StateManage/useConversation'
import axios from 'axios'
import Cookies from 'js-cookie'

const useSendMessage = () => {
    const [loading, setLoading] = useState(false)
    const { selectedConversation, messages, setMessages } = useConversation()
    const sendMessages = async (message) => {
        setLoading(true)
        try {
            const token = Cookies.get('jwt')
            console.log(message)
            const res = await axios.post(`http://localhost:5002/message/send/${selectedConversation._id}`,
                { message },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            )
            console.log(res.data)
            setMessages([...messages, res.data.newMessage])
            setLoading(false)
        } catch (error) {
            console.log("Error in useSendMessage: " + error)
            setLoading(false)
        }
    }
return { loading, sendMessages }
}

export default useSendMessage
