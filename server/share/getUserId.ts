import jwt from 'jsonwebtoken'

export const getUserId = (req: any) => {
    const token = req.headers['authorization']
    const decode: any = jwt.verify(token, 'jwt-secret')
    const userId = decode.userId
    return userId
}