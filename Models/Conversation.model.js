import mongoose, { Mongoose } from 'mongoose'
import MessageModel from './Message.model.js'
import UserModel from './User.model.js'

const ConversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserModel
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: MessageModel,
            default: []
        }
    ]
},
    {
        timestamps: true
    })

    const ConversationModel = mongoose.model('ConversationData', ConversationSchema)
    
    export default ConversationModel