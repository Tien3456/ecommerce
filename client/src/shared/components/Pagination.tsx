import React, { useState, useEffect } from 'react'
import { Pagination, PaginationItem, IconButton } from '@mui/material'
import { useLocation, useHistory } from 'react-router-dom'
import { useStyles } from './styles/Pagination'

interface Props {
    count: number,
    disabled: boolean
}

const CustomPagination: React.FC<Props> = ({ count, disabled }) => {

    const location = useLocation()
    const history = useHistory()
    const classes = useStyles()

    const [currentPage, setCurrentPage] = useState<number>(1)

    useEffect(() => {
        let page: number = 1
        const pageQuery = new URLSearchParams(location.search).get('page')
        if(pageQuery) {
            page = parseInt(pageQuery)
            if(page === 0) {
                page = 1
            }
        }
        setCurrentPage(page)
    }, [location])

    const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
        
        let queryObj: any = {}, url: string = ''
        new URLSearchParams(location.search).forEach((value, key) => {
            queryObj[key] = value
        })

        const newQueryObj = {
            ...queryObj,
            page: value
        }

        const keys = Object.keys(newQueryObj)

        keys.forEach((key, i) => {
            i === 0
                ? url = url.concat(`?${key}=${newQueryObj[key]}`)
                : url = url.concat(`&${key}=${newQueryObj[key]}`)
        })
        history.push(url)
    }

    return (
        <Pagination
            className={ classes.root }
            count={ count }
            page={ currentPage }
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
