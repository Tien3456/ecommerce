import { lazy } from '@loadable/component'

export const routes = {
    publicRoutes: [
        {
            path: '/',
            exact: true,
            loader: lazy(() => import('../pages/Home/index'))
        }, {
            path: '/products',
            exact: true,
            loader: lazy(() => import('../pages/Categories/index'))
        }, {
            path: '/cart',
            exact: true,
            loader: lazy(() => import('../pages/Cart/index'))
        }, {
            path: '/checkout',
            exact: true,
            loader: lazy(() => import('../pages/Checkout/index'))
        }, {
            path: '/product/:id',
            exact: true,
            loader: lazy(() => import('../pages/ProductDetails/index'))
        }
    ],
    privateRoutes: [
        {
            path: '/profile',
            exact: true,
            loader: lazy(() => import('../pages/Profile/index'))
        }, {
            path: '/addresses',
            exact: true,
            loader: lazy(() => import('../pages/Addresses/index'))
        }, {
            path: '/wishlist',
            exact: true,
            loader: lazy(() => import('../pages/Favorites/index'))
        }
    ],
    authRoutes: [
        {
            path: '/signin',
            exact: true,
            loader: lazy(() => import('../pages/Auth/SignIn/index'))
        }, {
            path: '/signup',
            exact: true,
            loader: lazy(() => import('../pages/Auth/SignUp/index'))
        }
    ]
}