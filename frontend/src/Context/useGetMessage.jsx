import React, { useEffect, useState } from 'react'
import useConversation from '../StateManage/useConversation'
import axios from 'axios'
import Cookies from 'js-cookie'

const useGetMessage = () => {
    const [loading,setLoading] = useState(false)
    const {messages,setMessages, selectedConversation} = useConversation()


    useEffect(()=>{
        const getMessages = async () => {
            setLoading(true)
            if(selectedConversation && selectedConversation._id){
            try{ 
                const token = Cookies.get("jwt");
                const response = await axios.get(`http://localhost:5002/message/get/${selectedConversation._id}`, {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }})
                setLoading(false)
                setMessages(response.data)
            } catch(error) {
                console.log("Error in useGetMessage: "+error)

            }
        }
        }
        getMessages()
    },[selectedConversation,setMessages])
  return {
    messages,
    loading
  }
}

export default useGetMessage
