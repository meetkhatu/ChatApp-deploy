import jwt from 'jsonwebtoken'


const createTokenSaveCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_TOKEN,{
        expiresIn: "5d"
    })
    res.cookie('jwt', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    })
}


export default createTokenSaveCookie