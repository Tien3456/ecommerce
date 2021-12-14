import React, { useState, useEffect } from 'react'

export const useSlideX = (
    itemWidth: number | null,
    spacing: number | null,
    threshold: number,
    itemsQty: number | null,
    visibleItemsQty: number | null,
    containerRef: React.MutableRefObject<HTMLElement | null>
) => {

    const [index, setIndex] = useState<number>(0)
    const [initialScreenX, setInitialScreenX] = useState<number | null>(null)
    const [isAbleToClick, setAbleToClick] = useState<boolean>(false)

    const scrollEl = (
        start: number,
        end: number,
        ref: React.MutableRefObject<HTMLElement | null>
    ) => {
        if(start < end) {
            let scroll = setInterval(() => {
                ref.current?.scrollTo(start, 0)
                if(start > end) {
                    ref.current?.scrollTo(end, 0)
                    clearInterval(scroll)
                }
                start += 10
            }, 10)
        }
        if(start > end) {
            let scroll = setInterval(() => {
                ref.current?.scrollTo(start, 0)
                if(start < end) {
                    ref.current?.scrollTo(end, 0)
                    clearInterval(scroll)
                }
                start -= 10
            }, 10)
        }
    }

    useEffect(() => {
        if(itemWidth !== null && spacing !== null && containerRef.current) {
            const currentScrollLeft = containerRef.current.scrollLeft
            const scrollLeft =  index * (spacing + itemWidth)
            scrollEl(currentScrollLeft, scrollLeft, containerRef)
        }
    }, [index])

    const handleBack = () => {
        itemsQty && visibleItemsQty &&
            setIndex(prevIndex => {
                if(prevIndex === 0) {
                    return itemsQty - visibleItemsQty
                }
                return prevIndex - 1
            })
    }

    const handleNext = () => {
        itemsQty && visibleItemsQty &&
            setIndex(prevIndex => {
                if(prevIndex === itemsQty - visibleItemsQty) {
                    return 0
                }
                return prevIndex + 1
            })
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        setInitialScreenX(e.screenX)
        setAbleToClick(true)
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if(
            initialScreenX !== null &&
            spacing !== null &&
            itemWidth !== null
        ) {
            const currentScreenX = e.screenX
            if(currentScreenX !== initialScreenX && isAbleToClick) {
                setAbleToClick(false)
            }
            const initialScrollLeft = index * (spacing + itemWidth)
            const currentScrollLeft = initialScrollLeft + (initialScreenX - currentScreenX)
            e.currentTarget.scrollTo(currentScrollLeft, 0)
        }
    }

    const handleMouseEnd = (e: React.MouseEvent<HTMLElement>) => {
        if(
            initialScreenX !== null &&
            itemWidth !== null &&
            spacing !== null &&
            itemsQty !== null &&
            visibleItemsQty !== null
        ) {
            const currentScrollLeft = e.currentTarget.scrollLeft
            const prevScrollLeft = index * (spacing + itemWidth)
            let currentIndex = currentScrollLeft / (itemWidth + spacing)
            let residuleSpacing: number

            if(currentIndex >= 0 && currentIndex < itemsQty - visibleItemsQty) {
                currentIndex = Math.floor(currentIndex)
                switch(currentScrollLeft > prevScrollLeft) {
                    case true:
                        residuleSpacing = currentScrollLeft % (itemWidth + spacing)
                        if(residuleSpacing > threshold) {
                            currentIndex ++
                        }
                        break
                    default:
                        residuleSpacing = (itemWidth + spacing) - (currentScrollLeft % (itemWidth + spacing))
                        if(residuleSpacing < threshold) {
                            currentIndex ++
                        }
                        break
                }
            } else if(currentIndex < 0) {
                Math.abs(currentScrollLeft) > threshold
                    ? currentIndex = itemsQty - visibleItemsQty
                    : currentIndex = 0
            } else if(currentIndex >= itemsQty - visibleItemsQty) {
                currentScrollLeft > threshold
                    ? currentIndex = 0
                    : currentIndex = itemsQty - visibleItemsQty
            }

            if(index === currentIndex) {
                scrollEl(currentScrollLeft, prevScrollLeft, containerRef)
            }

            setIndex(currentIndex)
            setInitialScreenX(null)
        }
    }

    return {
        isAbleToClick,
        currentIndex: index,
        handleBack,
        handleNext,
        handleMouseDown,
        handleMouseMove,
        handleMouseEnd
    }
    
}