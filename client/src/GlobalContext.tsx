import React from 'react'
import { useWindowSize, WindowSize } from './hooks/useWindowSize'

interface Props {
    children: JSX.Element | JSX.Element[]
}

interface Context {
    windowSize: WindowSize
}

const initialState = {
    windowSize: {
        width: undefined,
        height: undefined
    }
}

export const AppContext = React.createContext<Context>(initialState)

const GlobalContext: React.FC<Props> = ({ children }) => {

    const windowSize = useWindowSize()

    return (
        <AppContext.Provider
            value={{ windowSize }}
        >
            { children }
        </AppContext.Provider>
    )
}

export default GlobalContext
