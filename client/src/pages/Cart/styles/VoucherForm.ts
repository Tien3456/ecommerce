import { makeStyles } from '@mui/styles'

interface Props {
    isFilled: boolean
}

export const useStyles = makeStyles((theme: any) => ({
    root: {

    },
    label: {
        '&.MuiTypography-root': {
            fontWeight: "bold",
            fontSize: "14px",
            opacity: 0.9
        }
    },
    textarea: {
        width: "100%",
        outline: 0,
        resize: "none",
        padding: theme.spacing(1),
        borderRadius: "5px",
        border: (props: Props) => props.isFilled 
            ? `2px solid ${theme.customColor.tomato.main}` 
            : "1px solid #c5c5c5",
        '&:focus': {
            border: `2px solid ${theme.customColor.tomato.main}`
        }
    },
    textField: {
        '& .MuiInputLabel-root': {
            fontSize: "14px",
        }
    },
    button: {
        '&.MuiButton-root': {
            border: `1px solid ${theme.customColor.tomato.main}`,
            color: theme.customColor.tomato.main,
            width: "100%",
            textTransform: "capitalize"
        }
    }
}))