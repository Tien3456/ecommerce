import { Router } from 'express'
import { productsController } from '../controllers/products'

const router = Router()

router.get('/', productsController.getProductList)
router.get('/categories', productsController.getCategories)
router.get('/favorite', productsController.getFavoriteProducts)
router.post('/favorite-product-ids', productsController.getFavoriteProductIds)

export default router