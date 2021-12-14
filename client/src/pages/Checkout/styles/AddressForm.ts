import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
        '& h4.heading': {
            fontWeight: "bold",
            opacity: 0.95
        }
    },
    formGroup: {
        '& .MuiTextField-root': {
            '& label': {
                fontSize: "15px"
            }
        }
    },
    rowFormGroup: {
        display: "grid",
        gap: theme.spacing(2),
        [theme.breakpoints.only('xs')]: {
            gridTemplateColumns: "auto",
        },
        [theme.breakpoints.up('sm')]: {
            gridTemplateColumns: "auto auto",
        },
    }
}))