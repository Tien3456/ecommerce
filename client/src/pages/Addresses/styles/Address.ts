import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
        borderRadius: "8px",
        boxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
        WebkitBoxShadow: "rgb(3 0 71 / 9%) 0px 1px 3px",
        background: "#fff",
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
        '& .MuiInput-root': {
            [theme.breakpoints.up('sm')]: {
                '&:nth-child(1)': {
                    width: "16%"
                },
                '&:nth-child(2)': {
                    width: "40%"
                },
                '&:nth-child': {
                    width: "18%"
                },
            },
            [theme.breakpoints.only('xs')]: {
                width: "100%"
            },
            '& input': {
                outline: 0,
                border: "none",
                opacity: 0.9,
                fontSize: "14px",
                width: "100%",
                background: "none"
            }
        },
        '& button.MuiIconButton-root:disabled': {
            cursor: "not-allowed"
        }
    }
}))