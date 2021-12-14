import { userController } from '../controllers/user'
import { Router } from 'express'

const router = Router()

router.get('/', userController.getUserInfo)
router.get('/addresses', userController.getAddresses)
router.post('/addresses/update', userController.updateAddress)
router.get('/addresses/delete/:addressId', userController.deleteAddress)

export default router