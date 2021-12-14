import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/User'

export const authController = {
    checkAuth: async (req: any, res: any) => {
        const token = req.headers['authorization']
        if(!token) {
            return res.status(200).json({ authenticated: false })
        }
        const decode: any = jwt.verify(token, 'jwt-secret')
        const userId = decode.userId
        try {
            const user = await User.findById(userId).lean()
            if(user) {
                const { password, ...rest } = user
                return res.status(200).json({
                    authenticated: true,
                    user: rest
                })
            }
            res.status(200).json({
                authenticated: false,
                authMessages: []
            })
        } catch(err) {
            res.status(500).json({ msg: 'Error' })
        }
    },
    signIn: async (req: any, res: any) => {
        const { email, password } = req.body
        console.log(req.body)
        try {
            const user = await User.findOne({ email: email }).lean()
            if(user) {
                const isMatch = await bcrypt.compare(password, user.password)
                if(isMatch) {
                    const token = jwt.sign({ userId: user._id.toString() }, 'jwt-secret')
                    const { password, ...rest } = user
                    return res.status(200).json({
                        authenticated: true,
                        token,
                        user: rest
                    })
                }
                return res.status(200).json({
                    authenticated: false,
                    authMessages: [
                        {
                            param: 'password',
                            msg: 'Password is not correct'
                        }
                    ]
                })
            }
            res.status(200).json({
                authenticated: false,
                authMessages: [
                    { param: 'email', msg: "This email wasn't signed up" }
                ]
            })
        } catch(err) {
            res.status(500).json({ msg: 'Error' })
        }
    },
    signUp: async (req: any, res: any) => {
        const { email, username, password } = req.body
        console.log(req.body)
        try {
            const user = await User.findOne({ email: email.trim() })
            if(user) {
                return res.json({
                    authenticated: false,
                    authMessages: [
                        {
                            param: 'email',
                            msg: 'Email was signed up. Please sign in!'
                        }
                    ]
                })
            }
            const hashedPassword = await bcrypt.hash(password, 10)
            const newUser = new User({
                email,
                username,
                password: hashedPassword
            })

            const newDoc = await newUser.save()
            const token = jwt.sign({ userId: newDoc._id.toString() }, 'jwt-secret')
            const { password: pass, ...rest } = newDoc

            res.status(200).json({
                authenticated: true,
                token,
                user: rest
            })
        } catch(err) {
            console.log(err)
            res.status(500).json({ msg: 'Error' })
        }
    }
}