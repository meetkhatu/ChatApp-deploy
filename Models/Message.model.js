import mongoose, { Schema } from 'mongoose'

const MessageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserData",
        required: true
    },
    message: {
        type: String,
        required: true,
        maxlength: 1000,
        trim: true,
        validate: [
            {
                validator: (value) => value.length > 0,
                message: 'Message cannot be empty'
            },
            {
                validator: (value) => /^[a-zA-Z0-9\s\S]*$/.test(value),
                message: 'Message can only contain alphanumeric characters, spaces and special characters'
            },
        ]
    }
},
    {
        timestamps: true
    })

const MessageModel = mongoose.model('MessageData', MessageSchema)

export default MessageModel