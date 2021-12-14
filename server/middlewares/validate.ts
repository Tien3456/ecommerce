import { validationResult } from "express-validator"

export const validate = (req: any, res: any, next: any) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(200).json({
            authMessages: errors.array().map(error => {
                return {
                    param: error.param,
                    msg: error.msg
                }
            })
        })
    }
    next()
}