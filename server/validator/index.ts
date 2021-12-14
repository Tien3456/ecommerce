import { body } from 'express-validator'

export const validator = {
    checkEmail: () => {
        return body('email')
            .normalizeEmail()
            .isEmail()
            .withMessage('Invalid email')
    },
    checkPassword: () => {
        return body('password')
            .isLength({ min: 5 })
            .withMessage('Password must be at least 5 chars long')
            .matches(/\d/)
            .withMessage('Password must contain a number')
    },
    checkUsername: () => {
        return body('username')
            .isLength({ min: 2 })
            .withMessage('Username must be at least 2 chars long')
            .isLength({ max: 20 })
            .withMessage('Username must be less more than 20 chars long')
    }
}