import React, { useState, useEffect } from 'react'
import { Box, useTheme, useMediaQuery } from '@mui/material'
import { makeStyles } from '@mui/styles'
import TopBar from './TopBar'
import MiddleBar from './MiddleBar'
import BottomBar from './BottomBar'
import { useAppThunkDispatch as useDispatch } from '../redux/hooks'
import { actions as categoryActions } from '../redux/categories/actions'

const useStyles = makeStyles((theme: any) => ({
    root: {
        width: "100%"
    }
}))

const Header = () => {

    const dispatch = useDispatch()
    const classes = useStyles()
    const theme = useTheme()
    const isGreaterThanXs: boolean = useMediaQuery(theme.breakpoints.up('sm'))

    const [topBarHeight, setTopBarHeight] = useState<undefined | number>(undefined)

    useEffect(() => dispatch(categoryActions.doGetCategories()), [])

    return (
        <header className={ classes.root }>
            <TopBar setTopBarHeight={ setTopBarHeight } />
            <MiddleBar topBarHeight={ topBarHeight } />
            <BottomBar />
        </header>
    )
}

export default Header
