import bcrypt from 'bcryptjs'
import createTokenSaveCookie from '../JWT/generate.token.js'
import UserModel from '../Models/User.model.js'

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const user = await UserModel.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "Email Already Exists!" })
        }

        const HashedPass = await bcrypt.hash(password, 10)

        const newUser = await new UserModel({
            name,
            email,
            password: HashedPass
        })

        newUser.save()
        if (newUser) {
            createTokenSaveCookie(newUser._id, res)
            res.status(201).json({
                message: "User Regisered Successfully!", user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid User or Password" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid User or Password" })
        }
        createTokenSaveCookie(user._id, res)
        res.status(201).json({ message: "User logged in successfully", user: { _id: user._id, name: user.name, email: user.email } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
}


export const logout = async (req, res) => {
    try {
        res.clearCookie('jwt')
        res.status(200).json({ message: "User Logged Out Successfully!" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
}



export const getUserProfile = async (req, res) => {
    try {
        const loggedInUser = req.user._id
        const filteredUsers = await UserModel.find({_id: {$ne: loggedInUser}}).select('-password')
        res.status(201).json({ filteredUsers })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error" })
    }
}
