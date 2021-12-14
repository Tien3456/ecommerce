import { useState, useEffect, useCallback } from 'react'

export const useAsync = <T>(
    asyncFunction: () => Promise<T>,
    immediate: boolean = true
) => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [value, setValue] = useState<T | null>(null)

    const execute = useCallback(() => {
        setLoading(true)

        return asyncFunction()
            .then((response: any) => {
                setLoading(false)
                setValue(response)
            })

    }, [asyncFunction])

    useEffect(() => {
        if(immediate) {
            execute()
        }
    }, [])

    return {
        execute,
        isLoading,
        value
    }
}