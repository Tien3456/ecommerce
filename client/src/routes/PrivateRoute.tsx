import React, { Suspense } from 'react'
import { Route } from 'react-router-dom'
import Fallback from '../shared/components/Fallback'

interface Props {
    path: string,
    exact: boolean,
    component: any
}

const PrivateRoute: React.FC<Props> = ({ component: Component, ...rest }) => {

    return (
        <Route
            {...rest}
            render={(props) => (
                <Suspense fallback={<Fallback />}>
                    <Component {...props} />
                </Suspense>
            )}
        />
    )
}

export default PrivateRoute