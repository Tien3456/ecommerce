import { useEffect, useRef } from 'react'

export const useUpdateEffect = (
    callback: () => void, 
    dependencies: any[]
) => {
    const firstRender = useRef<boolean>(true)

    useEffect(() => {
        if(firstRender.current) {
            firstRender.current = false
            return
        }
        callback()
    }, dependencies)

}