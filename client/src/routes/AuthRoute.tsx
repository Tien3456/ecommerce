import React, { Suspense } from 'react'
import Fallback from '../shared/components/Fallback'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { useAppSelector as useSelector } from '../redux/hooks'

interface Props {
    path: string,
    exact: boolean,
    component: any
}

const AuthRoute: React.FC<Props> = ({ component: Component, ...rest }) => {

    const location: any = useLocation()

    const { authenticated } = useSelector(state => state.auth)

    return (
        <Route
            {...rest}
            render={(props) => (
                authenticated !== null
                    ? (
                        authenticated
                            ? <Redirect 
                                to={
                                    location.state?.from
                                        ? location.state.from
                                        : "/"
                                }
                            />
                            : <Suspense fallback={<Fallback />}>
                                <Component {...props} />
                            </Suspense>
                    )
                    : <></>
            )}
        />
    )
}

export default AuthRoute