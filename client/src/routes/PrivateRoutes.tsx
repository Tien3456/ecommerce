import React, { useEffect } from 'react'
import PrivateLayout from '../shared/components/PrivateLayout'
import PrivateRoute from './PrivateRoute'
import Fallback from '../shared/components/Fallback'
import { Route, Redirect } from 'react-router-dom'
import { routes } from './routes'
import { useAppSelector as useSelector } from '../redux/hooks'

const PrivateRoutes = () => {

    const { authenticated } = useSelector(state => state.auth)
    const currentPath = window.location.href.replace(window.location.origin, "")

    return (
        <Route
            path={ routes.privateRoutes.map(route => route.path) }
        >
            {
                authenticated
                    ? <PrivateLayout>
                        {
                            routes.privateRoutes.map(route => (
                                <PrivateRoute
                                    key={ route.path }
                                    path={ route.path }
                                    exact={ route.exact }
                                    component={ route.loader }
                                />
                            ))
                        }
                    </PrivateLayout>
                    : <Redirect
                        to={{
                            pathname: "/signin",
                            state: {
                                from: currentPath
                            }
                        }}
                    />
            }
        </Route>
    )
}

export default PrivateRoutes
