import React, { useEffect, EffectCallback } from 'react'
import Options from './Options'
import Products from './Products'
import Pagination from '../../shared/components/Pagination'
import { Box, Stack, Container } from '@mui/material'
import { 
    useAppSelector as useSelector,
    useAppDispatch as useDispatch
} from '../../redux/hooks'
import { actions } from '../../redux/categories/actions'

const Categories = () => {

    const limit = 12
    const dispatch = useDispatch()

    const { products } = useSelector(state => state.categories)

    useEffect((): ReturnType<EffectCallback> => {
        return (): void => {
            dispatch(actions.doResetProducts())
        }
    }, [])

    return (
        <Box
            sx={{
                background: "rgba(25, 118, 210, 0.04)",
                py: 6
            }}
        >
            <Container>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    flexWrap="wrap"
                >
                    <Options limit={ limit } />
                    <Products />
                </Stack>
                <Stack
                    alignItems="center"
                    justifyContent="center"
                    sx={{ mt: 6 }}
                >
                    {
                        products.quantity !== 0 &&
                            <Pagination 
                                count={ Math.ceil(products.quantity / limit) } 
                                disabled={ products.isLoading }
                            />
                    }
                </Stack>
            </Container>
        </Box>
    )
}

export default Categories
