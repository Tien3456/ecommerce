import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
        '& .MuiTypography-root': {
            textTransform: "capitalize",
            fontWeight: "bold",
            '&.name': {
                fontSize: "20px",
                opacity: 0.9
            },
            '&.title': {
                fontSize: "14px"
            },
            '&.value': {
                fontSize: "14px",
                opacity: 0.9
            },
            '&.price': {
                fontSize: "20px",
                color: theme.customColor.tomato.main
            },
            '&.description': {
                fontSize: "14px",
                fontWeight: 400,
                opacity: 0.9,
                lineHeight: 2,
                '& span': {
                    fontSize: "14px"
                }
            }
        },
        '& button.btn-text': {
            background: theme.customColor.tomato.main,
            color: "#fff",
            textTransform: "capitalize",
            padding: `10px ${theme.spacing(3)}`,
            '&:hover': {
                background: theme.palette.error.main
            }
        }
    }
}))