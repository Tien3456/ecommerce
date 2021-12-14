import React, { useState, useEffect } from 'react'

export const useInfiniteScroll = (
    loadAction: () => void,
    itemsLoadedQty: number,
    latestItem: React.MutableRefObject<HTMLElement | null>
) => {

    const [isFetching, setFetching] = useState<boolean>(false)

    useEffect(() => {
        itemsLoadedQty > 0 &&
            latestItem.current?.scrollIntoView({ behavior: "auto" })
        setFetching(false)
    }, [itemsLoadedQty])

    const handleScroll = (e: React.UIEvent<HTMLElement>) => {
        const scrollHeight = e.currentTarget.scrollHeight
        const scrollTop = e.currentTarget.scrollTop
        const clientHeight = e.currentTarget.clientHeight
        if(scrollHeight - scrollTop === clientHeight && !isFetching) {
            console.log('Scroll to bottom')
            setFetching(true)
            loadAction()
        }
    }

    return {
        handleScroll
    }
}