import React, { Dispatch, SetStateAction } from 'react'
import { 
    ListItem, ListItemText, ListItemAvatar, Avatar, 
    Box, Typography, Stack, Button, TextField, IconButton,
    useTheme
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useStyles } from './styles/Comment'
import Moment from 'react-moment'

export interface IComment {
    commentType: string,
    commentId: string,
    productId: string,
    sender: {
        _id: string,
        avatarSrc: string | null,
        username: string
    },
    text: string,
    imageSrcs: string[],
    createdAt: number,
}

interface Props extends IComment {
    setShowRepliedField?: Dispatch<SetStateAction<boolean>>
}

const Comment: React.FC<Props> = React.memo((props) => {

    const theme: any = useTheme()
    const classes = useStyles()

    return (
        <ListItem 
            sx={{ 
                px: 0
            }}
            className={ classes.root }
        >
            <ListItemAvatar>
                <Avatar
                    sx={{
                        width: "48px",
                        height: "48px",
                        bgcolor: theme.customColor.tomato.main,
                        color: "#fff",
                        fontWeight: "bold",
                        textTransform: "uppercase"
                    }}
                    src={ props.sender.avatarSrc || undefined }
                >
                    { props.sender.username.slice(0, 1) }
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                sx={{ my: 0, ml: 1 }}
                primary={ props.sender.username }
                secondary={
                    <>
                        <Typography 
                            component="span" 
                            className="text-comment"
                            sx={{ color: "text.disabled" }}
                        >
                            { props.text }
                        </Typography>
                        <Stack 
                            direction="row" 
                            alignItems="center"
                            spacing={ 1 }
                        >
                            <Typography
                                component="span"
                                className="created-at"
                                sx={{ color: "text.disabled" }}
                            >
                                <Moment fromNow>
                                    { new Date(props.createdAt).toString() }
                                </Moment>
                            </Typography>
                        </Stack>
                    </>
                }
            />
        </ListItem>
    )
})

export default Comment
