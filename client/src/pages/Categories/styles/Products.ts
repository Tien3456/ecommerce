import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme: any) => ({
    root: {
        position: "relative",
        display: "grid",
        justifyContent: "space-between",
        [theme.breakpoints.up('md')]: {
            gridTemplateColumns: "auto auto auto",
            width: "68%",
        },
        [theme.breakpoints.down('md')]: {
            gridTemplateColumns: "auto auto",
            width: "66%"
        },
        [theme.breakpoints.only('xs')]: {
            width: "100%"
        },
        gap: theme.spacing(2),
        minHeight: "100%",
        '& .loading-icon': {
            color: theme.customColor.indigo.main
        }
    }
}))