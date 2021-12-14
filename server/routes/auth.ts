import { Router } from 'express'
import { authController } from '../controllers/auth'
import { validator } from '../validator/index'
import { validate } from '../middlewares/validate'
import { checkAuth } from '../middlewares/checkAuth'

const router = Router()

router.get('/', authController.checkAuth)

router.post(
    '/signin', 
    validator.checkEmail(),
    validator.checkPassword(),
    validate,
    authController.signIn
)

router.post(
    '/signup',
    validator.checkEmail(),
    validator.checkUsername(),
    validator.checkPassword(),
    validate,
    authController.signUp
)

export default router