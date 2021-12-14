import React, { useState, useEffect } from 'react'
import { 
    List, Box, Typography, Stack, Button, CircularProgress,
    useTheme, useMediaQuery 
} from '@mui/material'
import Comment from './Comment'
import CommentForm from './CommentForm'
import { useParams } from 'react-router-dom'
import { api } from '../../api/index'
import { useAsync } from '../../hooks/useAsync'

const Comments = () => {

    const theme: any = useTheme()
    const isXs = useMediaQuery(theme.breakpoints.only('xs'))
    const productId = useParams<{ id: string }>().id
    const limit = 5

    const [offset, setOffset] = useState<number>(0)
    const [comments, setComments] = useState<any[]>([])
    const [commentsQty, setCommentsQty] = useState<number>(0)

    const fetchGetComments = () => {
        return api.get(`/product/${productId}/comments?offset=${offset}}&limit=${limit}`)
    }

    const getComments = useAsync<{
        comments: any[],
        commentsQty: number
    }>(fetchGetComments, false)

    useEffect(() => {
        getComments.execute()
    }, [])

    useEffect(() => {
        if(getComments.value) {
            const { comments: fetchingComments, commentsQty } = getComments.value

            setOffset(prevOffset => prevOffset + fetchingComments.length)
            setComments(prevComments => [...fetchingComments, ...prevComments])
            setCommentsQty(commentsQty)
        }
    }, [getComments.value])

    return (
        <Box>
            <List 
                sx={{ 
                    py: 3,
                    width: isXs ? "100%" : "70%"
                }}
            >
                <Box 
                    my={ 3 }
                    sx={{ display: "flex" }}
                >
                    <Typography 
                        component="h3" variant="h6"
                        sx={{ 
                            position: "relative",
                            fontWeight: "bold", 
                            opacity: 0.9,
                            py: 1,
                            '&::before': {
                                position: "absolute",
                                content: "''",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                height: "3px",
                                bgcolor: theme.customColor.tomato.main,
                                transition: "all 0.3s ease-out",
                                WebkitTransition: "all 0.3s ease-out",
                                MozTransition: "all 0.3s ease-out",
                            },
                            '&:hover::before': {
                                width: "120%"
                            }
                        }}
                    >
                        Comments
                    </Typography>
                </Box>
                <Box>
                    {
                        commentsQty && commentsQty > offset && !getComments.isLoading
                            ? <Button 
                                onClick={ getComments.execute }
                                sx={{
                                    textTransform: "unset",
                                    color: "black",
                                    opacity: 0.9,
                                    fontWeight: "bold",
                                    fontSize: "14px",
                                    p: 0,
                                    '&:hover': {
                                        background: "none"
                                    }
                                }}
                            >
                                See more
                            </Button>
                            : <></>
                    }
                    {
                        getComments.isLoading && offset > 0 &&
                            <Box color="text.disabled">
                                <CircularProgress color="inherit" size={ 20 } />
                            </Box>
                    } 
                    {
                        comments.length > 0 &&
                        comments.map((comment) => (
                            <Comment key={ comment._id } {...comment} />
                        ))
                    }
                </Box>
            </List>
            <CommentForm 
                setComments={ setComments }
                setCommentsQty={ setCommentsQty }
                setOffset={ setOffset }
            />
        </Box>
    )
}

export default Comments