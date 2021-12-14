import React, { useState } from 'react'

interface BackgroundPosition {
    x: number | null,
    y: number | null
}

export const useZoomIn= () => {

    const [backgroundPosition, setBackgroundPosition] = useState<BackgroundPosition>({
        x: null,
        y: null
    })

    const [isZoomed, setZoom] = useState<boolean>(false)

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const width = e.currentTarget.offsetWidth
        const height = e.currentTarget.offsetHeight
        const mouseX = e.clientX
        const mouseY = e.clientY

        setBackgroundPosition({
            x: mouseX / width * 100,
            y: mouseY / height * 100
        })
        setZoom(true)
    }

    const handleMouseLeave = () => {
        setBackgroundPosition({
            x: null,
            y: null
        })
        setZoom(false)
    }

    return {
        isZoomed,
        backgroundPosition,
        handleMouseMove,
        handleMouseLeave
    }
}