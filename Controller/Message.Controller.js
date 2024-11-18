import ConversationModel from "../Models/Conversation.model.js"
import Message from '../Models/Message.model.js'
import { getReceiverSocketId, io } from "../SocketIO/server.js"

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            conversation = await ConversationModel.create({
                participants: [senderId, receiverId]
            })
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            conversation.messages.push(newMessage._id)
        }

        await Promise.all([conversation.save(), newMessage.save()])

        const receiversocketId = await getReceiverSocketId(receiverId)
        if(receiversocketId){
            io.to(receiversocketId).emit('newMessage', newMessage)
        }


        res.status(201).json({ message: "Message sent successfully", newMessage })
    } catch (error) {
        console.log("Error in sendMessage: " + error)
        res.status(500).json({ message: "Server Error" })
    }
}

export const getMessage = async (req, res) => {
    try {
        const { id: chatuser } = req.params
        const senderId = req.user._id
        let conversation = await ConversationModel.findOne(
            {
                participants: { $all: [senderId, chatuser] }
            }).populate('messages')
        if (!conversation) {
            return res.status(201).json([])
        }
        const messages = conversation.messages
        res.status(201).json(messages)
    } catch (error) {
        console.log("Error in getMessage: " + error)
        res.status(500).json({ message: "Server Error" })
    }
}
