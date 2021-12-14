import { homeController } from "../controllers/home"
import { Router } from 'express'

const router = Router()

router.get('/top-categories', homeController.getTopCategories)
router.get('/top-rating-categories', homeController.getTopRatingCategories)
router.get('/search', homeController.searchProducts)

export default router