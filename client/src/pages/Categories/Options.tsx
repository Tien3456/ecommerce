import React, { useState, useEffect, useRef, EffectCallback } from 'react'
import {
    Box, Stack, Typography, Button, Paper,
    FormGroup, FormControlLabel, FormControl,
    Checkbox, Radio, RadioGroup,
    styled
} from '@mui/material'
import { useStyles } from './styles/Options'
import { useLocation, useHistory } from 'react-router-dom'
import { useUpdateEffect } from '../../hooks/useUpdateEffect'
import { 
    useAppSelector as useSelector,
    useAppThunkDispatch as useDispatch
} from '../../redux/hooks'
import { actions } from '../../redux/categories/actions'

const StyledFormControlLabel = styled(FormControlLabel, {
    shouldForwardProp: (prop) => prop !== "checked"
})(({ theme, checked }) => ({
    color: checked ? "#fff" : "auto"
}))

const Options: React.FC<{ limit: number }> = ({ limit }) => {

    const dispatch = useDispatch()
    const classes = useStyles()
    const location = useLocation<any>()
    const history = useHistory()
    const fetchGetProducts = useRef<ReturnType<typeof setTimeout> | null>(null)

    const getQueryString = () => new URLSearchParams(location.search)
    
    const [selectedCategories, setSelectCategories] = useState<string[]>([])
    const [selectedPrice, setSelectPrice] = useState<string>('')

    const { categories } = useSelector(state => state.categories)


    const getProducts = (page: number) => {
        const offset = page * limit - limit
        dispatch(actions.doGetProducts(`${location.pathname}${location.search}`, offset, limit))
    }

    useEffect((): ReturnType<EffectCallback> => {
        return (): void => {
            if(fetchGetProducts.current) {
                clearTimeout(fetchGetProducts.current)
            }
        }
    }, [])

    useEffect(() => {
        if(fetchGetProducts.current) {
            clearTimeout(fetchGetProducts.current)
        }
        let page = 1
        const queryString = getQueryString()
        if(queryString.get('page')) {
            page = parseInt(String(queryString.get('page')))
        }
        fetchGetProducts.current = setTimeout(() => getProducts(page), 1000)
    }, [location.search])

    useEffect(() => {
        const categoriesString = getQueryString().get('categories')
        const priceString = getQueryString().get('price')

        categoriesString
            ? setSelectCategories(String(categoriesString).split(','))
            : setSelectCategories([])
        priceString
            ? setSelectPrice(priceString)
            : setSelectPrice('')
    }, [location.search])

    const handleSelectCategory = (category: string) => {

        let categoriesString = ''
        let queryString: string = ''

        selectedCategories.includes(category)
            ? categoriesString = selectedCategories.filter(c => c !== category).join(',')
            : categoriesString = [...selectedCategories, category].join(',')

        switch(categoriesString !== '') {
            case true:
                selectedPrice
                    ? queryString = `?categories=${categoriesString}&price=${selectedPrice}`
                    : queryString = `?categories=${categoriesString}`
                break
            default:
                if(selectedPrice) {
                    queryString = `?price=${selectedPrice}`
                }
                break
        }

        history.push(`${location.pathname}${queryString}`)
    }

    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        let queryString: string = ''

        const price = e.currentTarget.value
        
        switch(price !== '') {
            case true:
                selectedCategories.length > 0
                    ? queryString = `?categories=${selectedCategories.join(',')}&price=${price}`
                    : queryString = `?price=${price}`
                break
            default:
                if(selectedCategories.length > 0) {
                    queryString = `?categories=${selectedCategories.join(',')}`
                }
                break
        }

        history.push(`${location.pathname}${queryString}`)
    }

    return (
        <Paper
            elevation={0}
            className={classes.root}
        >
            <Box className="option-wrapper">
                <Typography component="h4">Categories</Typography>
                <FormGroup className={ classes.selectedCategories }>
                    {
                        categories.list.sort().map((category: string) => (
                            <StyledFormControlLabel
                                checked={ selectedCategories.includes(category) }
                                key={ category }
                                control={
                                    <Checkbox
                                        checked={ selectedCategories.includes(category) }
                                        className={classes.checkbox}
                                        onClick={() => handleSelectCategory(category)}
                                    />
                                }
                                label={ category }
                            />
                        ))
                    }
                </FormGroup>
                <Typography component="h4">Price</Typography>
                <FormControl className={ classes.selectedPrices }>
                    <RadioGroup
                        aria-label="prices-range"
                        name="radio-buttons-group"
                        value={ selectedPrice }
                        onChange={ handleChangePrice }
                    >
                        <FormControlLabel
                            value=""
                            control={<Radio />} 
                            label="All"
                        />
                        <FormControlLabel 
                            value="0,500000" 
                            control={<Radio />} 
                            label="0 - 500000đ"
                        />
                        <FormControlLabel 
                            value="500000,1000000" 
                            control={<Radio />} 
                            label="500000đ - 1000000đ" 
                        />
                        <FormControlLabel 
                            value="1000000,5000000" 
                            control={<Radio />} 
                            label="1000000đ - 5000000đ" 
                        />
                        <FormControlLabel 
                            value="5000000đ" 
                            control={<Radio />} 
                            label="Greater than 5000000đ"
                        />
                    </RadioGroup>
                </FormControl>
            </Box>
        </Paper>
    )
}

export default Options
