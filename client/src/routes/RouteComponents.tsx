import React, { useEffect  } from 'react'
import { routes } from './routes'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import PublicRoute from './PublicRoute'
import PrivateRoutes from './PrivateRoutes'
import AuthRoute from './AuthRoute'
import Layout from '../components/Layout'
import { 
    useAppSelector as useSelector,
    useAppDispatch as useDispatch,
    useAppThunkDispatch
} from '../redux/hooks'
import { actions as errorActions } from '../redux/error/actions'
import { actions as authActions } from '../redux/auth/actions'

const RouteComponents = () => {

    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()
    const thunkDispatch = useAppThunkDispatch()

    const { status } = useSelector(state => state.error)

    useEffect(() => {
        thunkDispatch(authActions.doCheckAuth())
    }, [])

    useEffect(() => {
        if(status) {
            dispatch(errorActions.doResetError())
        }
    }, [location])

    useEffect(() => {
        if(status === 401) {
            history.push({
                pathname: '/signin',
                state: {
                    from: window.location.href
                                .replace(window.location.origin, "")
                }
            })
        }
    }, [status])

    return (
        status === 404
            ? <h1>Not found</h1>
            : (
                status === 500
                    ? <h1>Error</h1>
                    : <Switch>
                        <Route 
                            exact={ true } 
                            path={ 
                                routes.publicRoutes.map(route => route.path) 
                                    .concat(routes.privateRoutes.map(route => route.path))
                            }
                        >
                            <Layout>
                                {
                                    routes.publicRoutes.map(route => (
                                            <React.Fragment key={ route.path }>
                                                <PublicRoute
                                                    path={ route.path }
                                                    exact={ route.exact }
                                                    component={ route.loader }
                                                />
                                            </React.Fragment>
                                    ))
                                }
                                <PrivateRoutes />
                            </Layout>
                        </Route>
                        <Route path={ routes.authRoutes.map(route => route.path) }>
                            {
                                routes.authRoutes.map(route => (
                                    <React.Fragment key={ route.path }>
                                        <AuthRoute
                                            path={ route.path }
                                            exact={ route.exact }
                                            component={ route.loader }
                                        />
                                    </React.Fragment>
                                ))
                            }
                        </Route>
                </Switch>
            )
        
    )
}

export default RouteComponents
