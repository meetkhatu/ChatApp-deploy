import express from 'express'
import { getMessage,sendMessage } from '../Controller/Message.Controller.js'
import secureRoute from '../Middleware/secureRoute.js'


const router = express.Router()

router.post('/send/:id', secureRoute, sendMessage)
router.get('/get/:id', secureRoute, getMessage)
export default router