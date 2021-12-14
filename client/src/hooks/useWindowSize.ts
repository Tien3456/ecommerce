import { useState, useEffect } from 'react'

export interface WindowSize {
    width: undefined | number,
    height: undefined | number
}

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: undefined,
        height: undefined
    })

    useEffect(() => {
        const resize = () => {
            const currentWidth = window.innerWidth
            const currentHeight = window.innerHeight
            setWindowSize({
                width: currentWidth,
                height: currentHeight
            })
        }
        resize()
        window.addEventListener('resize', resize)
        return () => window.removeEventListener('resize', resize)
    }, [])

    return windowSize
}