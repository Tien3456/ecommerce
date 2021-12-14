import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
        '& .title': {
            fontWeight: "bold",
            fontSize: "14px",
            color: "inherit"
        },
        '& .value': {
            fontWeight: "bold",
            fontSize: "15px",
            color: "black",
            opacity: 0.8
        },
        '& .MuiOutlinedInput-root': {
            '& input': {
                '&::placeholder': {
                    fontSize: "15px"
                },
                '&::-webkit-placeholder': {
                    fontSize: "15px"
                },
                '&:-ms-input-placeholder': {
                    fontSize: "15px"
                }
            }
        },
        '& .MuiButton-root': {
            border: `1px solid ${theme.customColor.tomato.main}`,
            textTransform: "capitalize",
            color: theme.customColor.tomato.main
        }
    }
}))