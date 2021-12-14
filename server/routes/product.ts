import { Router } from 'express'
import { productController } from '../controllers/product'
import { checkAuth } from '../middlewares/checkAuth'

const router = Router()

router.get('/:id', productController.getProductDetails)
router.get('/:id/like', checkAuth, productController.likeProduct)
router.get('/:id/comments', productController.getComments)
router.post('/:id/add-comment', checkAuth, productController.postComment)

export default router