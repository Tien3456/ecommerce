import React, { useState, useEffect, Dispatch, SetStateAction } from 'react' 
import { Box, TextareaAutosize, Button  } from '@mui/material'
import { useStyles } from './styles/CommentForm'
import { IComment } from './Comment'
import { api } from '../../api/index'
import { useAsync } from '../../hooks/useAsync'
import { useParams } from 'react-router-dom'

interface Props {
    setComments: Dispatch<SetStateAction<any[]>>,
    setCommentsQty: Dispatch<SetStateAction<number>>,
    setOffset: Dispatch<SetStateAction<number>>
}

const CommentForm: React.FC<Props> = (props) => {

    const productId = useParams<{ id: string }>().id
    const classes = useStyles()

    const [textFieldValue, setTextFieldValue] = useState<string>('')

    const fetchPostComment = () => {
        return api.post(`/product/${productId}/add-comment`, {
            text: textFieldValue
        })
    }

    const postComment = useAsync<{
        comment: IComment
    }>(fetchPostComment, false)

    useEffect(() => {
        if(postComment.value) {
            const { comment } = postComment.value
            props.setComments(prevComment => [...prevComment, comment])
            props.setCommentsQty(prevCommentsQty => prevCommentsQty + 1)
            props.setOffset(prevOffset => prevOffset + 1)
        }
    }, [postComment.value])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextFieldValue(e.target.value)
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        postComment.execute()
        setTextFieldValue('')
    }

    return (
        <Box className={ classes.root }>
            <form onSubmit={ handleSubmit }>
                <TextareaAutosize
                    className={
                        textFieldValue
                            ? "comment-field fill-text"
                            : "comment-field"
                    }
                    minRows={ 8 }
                    placeholder="Write your comment here"
                    required
                    value={ textFieldValue }
                    onChange={ handleChange } 
                />
                <Button 
                    type="submit"
                    className="button-submit"
                    disabled={ 
                        textFieldValue.trim() === '' ||
                        postComment.isLoading
                    }
                >
                    Submit
                </Button>
            </form>
        </Box>
    )
}

export default CommentForm
