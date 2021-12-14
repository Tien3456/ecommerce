import jwt from 'jsonwebtoken'
import User, { IUser } from '../models/User'

export const checkAuth = async (req: any, res: any, next: any) => {
    const token = req.headers['authorization']

    if(!token) {
        return res.status(401).json({ msg: "authorization" })
    }

    const decoded: any = jwt.verify(token, 'jwt-secret')
    const userId = decoded.userId

    try {
        const user = await User.findById(userId).lean()
        if(user) {
           return next()
        }
        return res.status(401).json({ msg: "Authorization" })
    } catch(err) {
        console.log(err)
        return res.status(500).json({ msg: 'Error' })
    }
}