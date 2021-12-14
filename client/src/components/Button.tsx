import React from 'react'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme: any) => ({
    root: {
        background: theme.customColor.indigo.main
    }
}))

const Button = () => {

    const classes = useStyles()

    return (
        <button className={ classes.root }>Hello World</button>
    )
}

export default Button
