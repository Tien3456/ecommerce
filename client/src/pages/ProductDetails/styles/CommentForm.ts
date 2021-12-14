import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
        '& .comment-field': {
            width: "100%",
            background: "transparent",
            border: `1px solid ${theme.customColor.tomato.main}`,
            padding: theme.spacing(1),
            outline: 0,
            borderRadius: "3px",
            resize: "none",
            '&:focus, &.fill-text': {
                borderWidth: "2px"
            }
        },
        '& .button-submit': {
            background: theme.customColor.tomato.main,
            padding: `${theme.spacing(1)} ${theme.spacing(3)}`,
            marginTop: theme.spacing(1),
            textTransform: "capitalize",
            color: "#fff",
            '&:disabled, &:hover': {
                background: theme.customColor.tomato.main,
                opacity: 0.8,
                color: "#fff"
            }
        }
    }
}))