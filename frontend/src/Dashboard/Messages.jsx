import React, { useEffect, useRef } from 'react'
import Message from '../Components/Message'
import useGetMessage from '../Context/useGetMessage'
import Loading from '../Components/Loading'
import useGetSocketMessage from '../Context/useGetSocketMessage'



const Messages = () => {
  useGetSocketMessage()
  const { messages, loading } = useGetMessage()
  console.log(messages)
  const lastMessage = useRef()
  useEffect(() => {
    setTimeout(() => {
      if (lastMessage.current) {
        lastMessage.current.scrollIntoView({ behaviour: "smooth" })
      }
    }, 300)
  }, [messages])

  return (

    <>
      <div style={{ minHeight: 'calc(64vh)', maxHeight: 'calc(64vh)' }} className='overflow-y-auto'>
        {loading
          ?
          (<Loading />)
          :
          (messages.length > 0 && messages.map((message) => (
            <div key={message._id} ref={lastMessage}>
            <Message message={message} />
            </div>
          )))
        }

        {!loading && messages.length === 0 && <div className='flex flex-col items-center justify-center h-[60vh] text-black'><p>Start a Conversation</p></div>}
      </div>
    </>
  )
}

export default Messages