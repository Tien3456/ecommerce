import React, { useState, useEffect } from 'react'
import { IconButton, Pagination, PaginationItem } from '@mui/material'
import { useStyles } from '../../shared/components/styles/Pagination'
import { useHistory, useLocation } from 'react-router-dom'

interface Props {
    count: number,
    disabled: boolean
}

const CustomPagination: React.FC<Props> = ({ count, disabled }) => {

    const classes = useStyles()
    const history = useHistory()
    const location = useLocation<any>()

    const queryString = new URLSearchParams(location.search)
    const currentPage = queryString.get('page')

    const [page, setPage] = useState<number>(parseInt(String(currentPage)) | 1)

    const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {

        setPage(value)

        const categoriesQuery = queryString.get('categories')
        const priceQuery = queryString.get('price')

        let newQueryString = ''
        
        if(categoriesQuery) {
            newQueryString = `?categories=${categoriesQuery}`
        }
        if(priceQuery) {
            newQueryString.includes('?')
                ? newQueryString = newQueryString.concat(`&price=${priceQuery}`)
                : newQueryString = newQueryString.concat(`?price=${priceQuery}`)
        }

        newQueryString.includes('?')
            ? newQueryString = newQueryString.concat(`&page=${value}`)
            : newQueryString = newQueryString.concat(`?page=${value}`)

        history.push(`${location.pathname}${newQueryString}`)
    }

    useEffect(() => {
        currentPage
            ? setPage(parseInt(String(currentPage)))
            : setPage(1)
    }, [currentPage])

    return (
        <Pagination
            className={ classes.root }
            count={ count }
            page={ page }
            renderItem={(item: any) => (
                <PaginationItem
                    component={IconButton}
                    {...item}
                />
            )}
            onChange={ handleChange }
            disabled={ disabled }
        />
    )
}

export default CustomPagination
